module Modelo
  class Api
    def gerar(url_status)
      response = HTTParty.get(url_status)
      response
    end
  end
end