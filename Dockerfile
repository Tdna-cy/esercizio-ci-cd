# Usa un'immagine base di Node.js
FROM node:20

# Imposta la directory di lavoro
WORKDIR /app

# Copia il package.json e installa le dipendenze
COPY package*.json ./
RUN npm install

# Copia tutto il codice dell'app
COPY . .

# Espone la porta 3000
EXPOSE 3000

# Comando per eseguire l'applicazione
CMD ["node", "app.js"]
