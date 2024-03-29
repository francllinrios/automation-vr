import hml from "../data/hml.json";
import prd from "../data/prd.json";
import mensagem from "../mensagem/mensagem.json";

export function buscaMassa(chaves) {
  const env = Cypress.env("ENVIRONMENT");
  const massa = env === "prd" ? prd : hml;

  if (typeof chaves === "string") {
    const arrChaves = chaves.split(" ");

    return arrChaves.reduce((acc, cur) => {
      const valid = acc[cur];

      if (valid) {
        acc = valid;
      }

      return acc;
    }, massa);
  }

  return "parametros incorretos";
}

export function buscaMensagem(chaves) {
  const massa = mensagem;

  if (typeof chaves === "string") {
    const arrChaves = chaves.split(" ");

    return arrChaves.reduce((acc, cur) => {
      const valid = acc[cur];

      if (valid) {
        acc = valid;
      }

      return acc;
    }, massa);
  }

  return "parametros incorretos";
}

export function formatarParaReal(valor) {
  if (valor < 100) {
      return (valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  } else {
      return (valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}

export function multiplicarValorRealPorQuantidade(valorFormatado, valorQuantidade) {
  let valorNumerico = parseFloat(valorFormatado.replace('R$', '').replace(',', '.'));
  let resultado = valorNumerico * valorQuantidade;

  return resultado.toFixed(2).replace('.', ',');
}