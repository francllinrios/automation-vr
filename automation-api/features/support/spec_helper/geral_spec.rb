def remover_marcadores(texto, marcadores)
  # pegando os array da massa valida para cada cenarios
  valor_marcadores = buscar_massa(marcadores)

  # Cria uma expressão regular para combinar qualquer um dos símbolos
  regex = Regexp.new(valor_marcadores.map { |s| Regexp.escape(s) }.join("|"))

  # Encontra o texto antes do primeiro símbolo encontrado
  texto_encontrado = texto.split(regex).first.strip
  texto_encontrado
end

