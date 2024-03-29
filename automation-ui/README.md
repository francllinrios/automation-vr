# Automation automation-ui

Clone do repositorio:

```bash
git clone https://github.com/Francllin/automation-vr.git
```

## Google Chrome

1. **Instalação do Google Chrome:**

Certifique-se de ter o Google Chrome instalado em seu sistema.


## Project Setup

Entrar na pasta do projeto:

### Sem docker

Para **instalar as dependencias**

```bash
npm install
```

Para **rodar os testes**

```bash
npm run cypress:run
```

## Com Docker

**Criar a imagem** com as dependencias instaladas

```bash
docker build -t automation_vr .
```

Para **executar o container** e ter acesso aos comandos

```bash
docker run --rm --network host --entrypoint /bin/sh -it automation_vr
```

Para **Remover as images se necessário**

```bash
- docker rm -vf $(docker ps -a -q)
- docker rmi -f $(docker images -a -q)
- docker network rm $(docker network ls -q)
```

Para **executar os testes**

```bash
docker run --rm --network host -v ~/.Xauthority:/root/.Xauthority:ro -e DISPLAY --entrypoint /bin/sh -it automation_vr -c 'npm run cypress:run'
```
