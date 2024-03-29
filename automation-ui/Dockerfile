# Use uma imagem base do Node.js
FROM cypress/browsers:latest

# Define o diretório de trabalho
WORKDIR /automation_ui/

# Copia os arquivos do diretório atual para o WORKDIR
COPY . /automation_ui/

# Instala as dependências do Node.js
RUN npm ci
