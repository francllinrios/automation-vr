Dado('a string de entrada "{string}"') do |texto_base|
  @texto = texto_base
end

Dado('os marcadores {string}') do |marcadores|
  @resultado_marcador = remover_marcadores(@texto, marcadores)
end

Então('a saída esperada é "{string}"') do |resultado_base|
  expect(@resultado_marcador).to eql(resultado_base)
end
