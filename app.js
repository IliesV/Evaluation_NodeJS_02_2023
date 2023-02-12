//Import d'express, framework nodeJS
const express = require("express");
// Création d'une application express, l'objet "app" permettra de manipuler notre application
const app = express();
//Import de fs qui permet la manipulation de fichier
const fs = require("fs");
//Import de body parser pour pouvoir gérer le contenue de nos requetes HTTP.
const bodyParser = require("body-parser");
// Pour faire l'appli express devra utiliser bodyParser
app.use(bodyParser.json());

//Import des routes vers les différents tableaux de notre jeu de données
const metallicaRoute = require('./src/routes/metallicaRoute');
app.use(metallicaRoute);


const LPRoute = require('./src/routes/LPRoute');
app.use(LPRoute);


const greenDayRoute = require('./src/routes/greenDayRoute');
app.use(greenDayRoute);


const sumRoute = require('./src/routes/sumRoute');
app.use(sumRoute);


const offspringRoute = require('./src/routes/offspringRoute');
app.use(offspringRoute);


const queenRoute = require('./src/routes/queenRoute');
app.use(queenRoute);

//Routing par défaut pour s'assurer que l'application tourne correctement au lancement
app.get('/', (request, response) =>{
    response.send("Tout fonctionne, pour l'instant.");
});

//export de l'objet app afin de pouvoir manipuler l'application autre part que dans ce fichier.
module.exports = app;
