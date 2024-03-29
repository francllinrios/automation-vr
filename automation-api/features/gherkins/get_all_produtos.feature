# encoding: utf-8
# language:pt

@#francllin_rios
@api
@produtos
Funcionalidade: Buscar informações no portal VT
  Como usuario do sistema
  Quero poder Buscar todas as informações no portal vt
  Para poder ter as informações mais claras

  @get_all_produtos
  Cenário: Buscar todos e validar a apresentação do typeOfEstablishment
    Quando criar o payload para buscar todos os produtos do portal VT
    Então validar que o produtos do portal VT seja apresentado com sucesso
