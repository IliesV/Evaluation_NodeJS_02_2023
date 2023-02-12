//Import d'express.
const express = require("express");
//Création d'un objet router d'express pour la gestion des requêtes
const router = express.Router();
//Déclaration d'une constante contenant le chemin vers notre controller.
const offspringController = require("../controllers/offspringController");


//Définition d'une URL qui affichera toutes les données d'un tableau lorsqu'elle recevra une requete de type GET 
router.get("/offspring", offspringController.getAllData);

//Définition d'une URL qui affichera les données d'un tableau correspondant a l'id fourni en paramètre lorsqu'elle recevra une requete de type GET 
router.get("/offspring/:id", offspringController.getDataById);

//Définition d'une URL qui affichera les données d'un tableau correspondant au titre fourni en paramètre lorsqu'elle recevra une requete de type GET 
router.get("/offspring/title/:titre", offspringController.getDataByTitle);

//Définition d'une URL qui ajoutera des données récupérés dans le body d'une requête POST à un tableau. 
router.post("/offspring", offspringController.createData);

//Définition d'une URL qui modifiera les données d'un tableau par celles présentes dans le body d'une requête de type PUT
router.put("/offspring/:id", offspringController.updateData);

//Définition d'une URL qui supprimera les données d'un tableau correspondant a l'id fourni en paramètre lorsqu'elle recevra une requete de type DELETE 
router.delete("/offspring/:id", offspringController.deleteDataById);

//Export de l'objet router
module.exports = router;
