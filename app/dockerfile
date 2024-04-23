#Front :  
FROM node:20.10

#Définition du répertoire de travail
WORKDIR /app

#Copie du projet react
COPY . .

#Installation des dépendances pour réact
#Exposition du port 3000
EXPOSE 3000

#Commande pour lancer le serveur
#CMD ["npm", "install" ,"&&","npm", "start"]

CMD npm install next@latest react@latest react-dom@latest && npm install && npm run dev
