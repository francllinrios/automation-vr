Quando('criar o payload para buscar todos os produtos do portal VT') do
  @response = get_all_produtos()
end

Então('validar que o produtos do portal VT seja apresentado com sucesso') do
  # validar que existe a key typeOfEstablishment no response da api fim com seu code
  expect(@response.code).to eql(buscar_massa('code ok'))
  expect(@response).to have_key('typeOfEstablishment')

  # Escolhe aleatoriamente uma opção da lista usando o método 'sample'
  random_option = @response["typeOfEstablishment"].sample

  # Validar de retonar as keys e se os valores são String
  expect(random_option).to be_a(Hash)
  expect(random_option).to have_key('key')
  expect(random_option).to have_key('name')
  expect(random_option).to have_key('label')
  expect(random_option['key']).to be_a(String)
  expect(random_option['name']).to be_a(String)
  expect(random_option['label']).to be_a(String)
  
  # Imprime na tela a opção escolhida de uma forma mais organnizada e clara
  output_message = "Opção aleatória escolhida:\n" \
                   "Key: #{random_option['key']}\n" \
                   "Name: #{random_option['name']}\n" \
                   "Label: #{random_option['label']}"

  puts output_message
end