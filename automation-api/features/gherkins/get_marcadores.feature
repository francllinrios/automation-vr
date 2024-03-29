# encoding: utf-8
# language:pt

@#francllin_rios
@api
@marcadores
Funcionalidade: Remoção de palavras após marcadores
  Como usuário do sistema,
  Eu quero poder remover palavras após marcadores específicos em uma string de entrada,
  Para obter uma saída esperada com as palavras desejadas.
  
  @marcadores_especificados
  Esquema do Cenário: Remover palavras após marcadores especificados
    Dado a string de entrada "<entrada>"
    E os marcadores "<marcadores>"
    Então a saída esperada é "<saida_esperada>"

    Exemplos:
      | entrada                                            | marcadores            | saida_esperada                 |
      | "bananas, tomates # e ventiladores"                | array_simbolos tipo01 | "bananas, tomates"             |
      | "o rato roeu a roupa $ do rei % de roma"           | array_simbolos tipo02 | "o rato roeu a roupa $ do rei" |
      | "the quick brown fox & jumped over * the lazy dog" | array_simbolos tipo03 | "the quick brown fox"          |
