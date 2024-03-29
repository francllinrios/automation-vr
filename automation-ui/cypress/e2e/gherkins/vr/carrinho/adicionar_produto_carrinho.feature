@$francllin_rios
@login
@add_produto_carrinho
Feature: Carrinho - produto adicionado ao carrinho
    Como usuário do sistema VR
    Quero ser capaz de adicionar um novo produto ao carrinho
    Para que eu possa finalizar a compra com sucesso.

    @reg
    @add_produto_com_sucesso_carrinho
    Scenario Outline: Validar que um produto pode ser adicionado com sucesso ao carrinho na loja virtual da VR
        Given estiver na página de compra de cartões VR
        When adicionnar uma quantidade aleatória de cartões do produto "<produto>" ao carrinho
        And digitar um valor de crédito aleatório para o produto "<produto>"
        Then validar que um produto pode ser adicionado com sucesso ao carrinho na loja virtual da VR

        Examples:
            | produto |
            | Auto    |