const util = require('util');
const glob = require('glob');
const path = require('path');
const spawn = require('cross-spawn');

const spawnPromise = (command, args, options) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data;
    });

    child.stderr.on('data', (data) => {
      stderr += data;
    });

    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
};

async function runTestThread(threadNumber, features, retryFeatures, maxRetries, results) {
  console.log(`Iniciando Thread ${threadNumber}. Features: ${features.join(', ')}`);

  while (features.length > 0) {
    const featurePath = retryFeatures.shift() || features.shift();

    if (!featurePath) {
      console.log(`Thread ${threadNumber} não tem mais features para executar.`);
      return;
    }

    const tags = featurePath.match(/@[\w-]+/g);
    const tagsCommand = tags ? `--env TAGS="${tags.join(',')}"` : '';
    const noColorEnv = 'NO_COLOR=1';
    const cypressEnvironmentEnv = 'CYPRESS_ENVIRONMENT=prd';

    // Adicione DYLD_LIBRARY_PATH para evitar conflitos de biblioteca
    const dyldLibraryPath = 'DYLD_LIBRARY_PATH=/System/Library/Frameworks/WebKit.framework/Versions/A/Frameworks/WebCore.framework/Versions/A/Frameworks';

    // Caminho do executável do Cypress no projeto
    const cypressBinaryPath = path.join('node_modules', '.bin', 'cypress');

    const command = `${noColorEnv} ${cypressEnvironmentEnv} ${dyldLibraryPath} ${cypressBinaryPath}`;
    const args = [
      'run',
      '--spec', `"${featurePath}"`,
      '--browser', 'chrome',
      '--headless',
      tagsCommand
    ];

    const options = {
      env: process.env,
      shell: true,
    };

    try {
      const { code, stdout, stderr } = await spawnPromise(command, args, options);

      if (code === 0 && stdout.includes('All specs passed')) {
        console.log(`Thread ${threadNumber} concluída com sucesso. Feature: ${featurePath}`);
        results.push({ feature: featurePath, status: 'passed' });
      } else {
        console.error(`Thread ${threadNumber} falhou ao executar ${featurePath}.`);
        console.error(`Erro: ${stderr}`);
        console.error(`Stack Trace: N/A`);
        console.log(stdout);

        if (maxRetries > 0) {
          retryFeatures.push(featurePath);
        }

        results.push({ feature: featurePath, status: 'failed' });
      }
    } catch (error) {
      console.error(`Thread ${threadNumber} falhou ao executar ${featurePath}.`);
      console.error(`Erro: ${error.stderr}`);
      console.error(`Stack Trace: ${error.stack || 'N/A'}`);

      if (maxRetries > 0) {
        retryFeatures.push(featurePath);
      }

      results.push({ feature: featurePath, status: 'failed' });
    }
  }
}

async function executeReportCommand() {
  const reportCommand = 'npm run generate:report';
  const reportArgs = [];
  const reportOptions = { shell: true };

  const { stdout } = await spawnPromise(reportCommand, reportArgs, reportOptions);
  console.log(`Comando de relatório executado. Resultado: ${stdout}`);
}

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key] = value;
  return acc;
}, {});

const threads = parseInt(args.threads) || 1;
const maxRetries = parseInt(args.retentativas) || 0;
const features = glob.sync('cypress/integration/**/*.feature');
const retryFeatures = [];
const results = [];

if (!features.length) {
  console.error('Nenhuma feature encontrada.');
  process.exit(1);
}

if (threads > features.length) {
  console.error('O número de threads não pode ser maior do que o número de features.');
  process.exit(1);
}

const featuresChunks = chunkArray(features, Math.ceil(features.length / threads));

const threadPromises = Array.from({ length: Math.min(threads, featuresChunks.length) }, (_, i) => i + 1)
  .map(threadNumber => runTestThread(threadNumber, featuresChunks[threadNumber - 1].slice(), retryFeatures.slice(), maxRetries, results));

Promise.all(threadPromises)
  .then(async () => {
    console.log('Todos os testes foram concluídos:');
    results.forEach(result => console.log(`${result.feature}: ${result.status}`));

    // Adicione um resumo dos cenários passados e falhados
    const passedScenarios = results.filter(result => result.status === 'passed').map(result => result.feature);
    const failedScenarios = results.filter(result => result.status === 'failed').map(result => result.feature);

    console.log('\nResumo:');
    console.log(`Cenários Passados: ${passedScenarios.length}`);
    console.log(`Cenários Falhados: ${failedScenarios.length}`);
    console.log('Lista de Cenários Passados:', passedScenarios.join(', '));
    console.log('Lista de Cenários Falhados:', failedScenarios.join(', '));

    // Execute o comando de relatório após a conclusão de todas as threads
    await executeReportCommand();
  })
  .catch(error => {
    console.error('Erro durante a execução em paralelo:', error);
    process.exit(1);
  });

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// comando para rodar EX: node runTestsInParallel.js threads=3 retentativas=0