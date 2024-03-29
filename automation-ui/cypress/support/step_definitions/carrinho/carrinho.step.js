/// <reference types="Cypress" />

/* eslint-disable no-undef */
/* global Given, When, Then */

import config from "../../../../config.env.json";
import pageCarrinho from "../../page_objects/carrinho/carrinho.page";
import { buscaMensagem, formatarParaReal, multiplicarValorRealPorQuantidade } from "../../commons/geral.commons";

let textoNomeCliente;
let numeroQuantidadeProduto;
let numeroValorProduto;
let nomeProduto;

Given(/^estiver na página de compra de cartões VR$/, () => {
  // Intercepte o evento window:open para capturar a nova janela
  cy.window().then((win) => {
    cy.stub(win, "open").as("windowOpen");
  });

  cy.get(pageCarrinho.carrinho.btn_compra_online, {
    timeout: config.globalTimeout,
  })
    .should("be.visible")
    .click();

  // Espere até que a nova janela seja aberta
  cy.get("@windowOpen").should("be.calledOnce");

  // Obtenha a URL da nova aba e manter o mesmo na principal
  cy.get("@windowOpen")
    .its("lastCall.args.0")
    .then((url) => {
      cy.visit(url);
    });

  cy.get(pageCarrinho.carrinho.btn_close_x, {
    timeout: config.globalTimeout,
  })
    .scrollIntoView({ duration: 2000 })
    .should("be.visible")
    .click();

  cy.get(pageCarrinho.carrinho.btn_selecionar_cartao_vr, {
    timeout: config.globalTimeout,
  })
    .scrollIntoView({ duration: 2000 })
    .should("be.visible")
    .click();
});

When(
  /^adicionnar uma quantidade aleatória de cartões do produto "([^"]*)" ao carrinho$/,
  (produto) => {
    nomeProduto = produto;
    cy.get(pageCarrinho.carrinho.div_nome_produto).each(($linha) => {
      cy.wrap($linha)
        .find("h2")
        .find("span")
        .invoke("text")
        .then((text) => {
          textoNomeCliente = text.trim().toUpperCase();
          if (textoNomeCliente === nomeProduto.toUpperCase()) {
            expect(textoNomeCliente).to.equal(textoNomeCliente.toUpperCase());
            numeroQuantidadeProduto = Math.floor(Math.random() * 100) + 1;
            return cy
              .get(pageCarrinho.carrinho.inpt_quantidade_produto_auto)
              .type(numeroQuantidadeProduto);
          }
        });
    });
  }
);

When(
  /^digitar um valor de crédito aleatório para o produto "([^"]*)"$/,
  (produto) => {
    nomeProduto = produto;
    cy.get(pageCarrinho.carrinho.div_nome_produto).each(($linha) => {
      cy.wrap($linha)
        .find("h2")
        .find("span")
        .invoke("text")
        .then((text) => {
          textoNomeCliente = text.trim().toUpperCase();
          if (textoNomeCliente === nomeProduto.toUpperCase()) {
            expect(textoNomeCliente).to.equal(textoNomeCliente.toUpperCase());
            numeroValorProduto = Math.floor(Math.random() * 1000) + 1;
            return cy
              .get(pageCarrinho.carrinho.inpt_valor_produto_auto)
              .type(numeroValorProduto);
          }
        });
    });
    cy.get(pageCarrinho.carrinho.btn_adicionar_carrinho_auto, {
      timeout: config.globalTimeout,
    })
      .scrollIntoView({ duration: 2000 })
      .should("be.visible")
      .click();
  }
);

Then(
  /^validar que um produto pode ser adicionado com sucesso ao carrinho na loja virtual da VR$/,
  () => {
    cy.get(pageCarrinho.carrinho.btn_seguir_carrinho_auto, {
      timeout: config.globalTimeout,
    })
      .scrollIntoView({ duration: 2000 })
      .should("be.visible");
    cy.contains(buscaMensagem("carrinho msg_produto_add")).should("be.visible");

    cy.get(pageCarrinho.carrinho.btn_meu_carrinho, {
      timeout: config.globalTimeout,
    })
      .scrollIntoView({ duration: 2000 })
      .should("be.visible")
      .click();

    cy.get(pageCarrinho.carrinho.div_produto_carrinho).each(($element) => {
      const texto = $element.text();
      expect(texto.toUpperCase()).to.include(nomeProduto.toUpperCase());
    });

    cy.get(pageCarrinho.carrinho.div_valor_carrinho).each(($element) => {
        const texto = $element.text();
        expect(texto.toUpperCase()).to.include(multiplicarValorRealPorQuantidade(formatarParaReal(numeroValorProduto), numeroQuantidadeProduto));
      });
  

    cy.get(pageCarrinho.carrinho.btn_seguir_para_carrinho, {
      timeout: config.globalTimeout,
    })
      .scrollIntoView({ duration: 2000 })
      .should("be.visible");

    cy.get(pageCarrinho.carrinho.btn_editar_produto_carrinho, {
      timeout: config.globalTimeout,
    })
      .scrollIntoView({ duration: 2000 })
      .should("be.visible");
  }
);
