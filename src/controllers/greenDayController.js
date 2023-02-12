//Import de fs pour pouvoir manipuler des fichiers depuis l'application
const fs = require('fs');

//Création et export d'une méthode qui permet de récupérer toute les données contenu dans le tableau associé au controller (ici "greenDay")
exports.getAllData = (request, response) => {
    //lecture du fichier Json faisant office de base de données
    fs.readFile("./src/models/albums.json", (err, data)=>{
        //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
        if (err) {
            response.status(500).json({
                message: "Erreur lors de la récupération des données",
                error:err
            })  
        //Sinon on renvoie un code 200.
        } else {
            response.status(200).json(JSON.parse(data).greenDay);
        }
    })
}

//Création et export d'une méthode permettant de récupérer les informations d'un objet contenu dans le tableau associé au controller par son id
exports.getDataById = (request, response) =>{
    //lecture du fichier Json faisant office de base de données
    fs.readFile("./src/models/albums.json", (err,data)=>{
        //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
        if (err) {
            response.status(500).json({
                message: "Erreur lors de la récupération des données",
                error:err
            })
        
        } else {
            //Si il n'y a pas d'erreur, on stock notre jeu de données dans une constante.
            const existingData = JSON.parse(data);
            //On recherche dans cete dernière si l'ID fourni par l'utilisateur existe au sein du tableau associé à ce controller
            const dataById = existingData.greenDay.find((obj) => obj.id === parseInt(request.params.id));
            //Si l'id est trouvé on renvoie un code 200 et on affiche les données demandées par l'utlisateur
            if (dataById) {
                response.status(200).json(dataById)    
            //Si l'utilisateur fourni un ID invalide, on renvoie un code 404 ainsi qu'un message d'erreur.
            } else {
                response.status(404).json({
                    message: "Aucun objet associé à cet ID n'existe",
                    error:err
                })
            }
        }
    });
};

//Création et export d'une méthode qui permet récupérer les informations d'un objet contenu dans le tableau associé au controller par son titre
exports.getDataByTitle = (request, response)=> {
    //lecture du fichier Json faisant office de base de données 
    fs.readFile("./src/models/albums.json", (err, data)=>{
        //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
        if (err){
            response.status(500).json({
                message: "Erreur lors de la récupération des données",
                error: err
            })
            //Si il n'y a pas d'erreur, on stock notre jeu de données dans une constante.
        } else {
            const existingData = JSON.parse(data);
            //On vérifie que le paramètre fourni par l'utilisateur est présent dans notre jeu de données.
            //Création d'une constante qui retournera true si c'est le cas et false si ça ne l'est pas.
            const dataByTitle = existingData.greenDay.find((obj)=> obj.titre === request.params.titre)
            //Si une corespondance avec le titre fourni par l'utilisateur est trouvé on renvoie un code 200 et on affiche les données correspondantes.
            if (dataByTitle){
                response.status(200).json(dataByTitle)
            //Si l'utilisateur fourni un titre invalide, on renvoie un code 404 ainsi qu'un message d'erreur
            } else {
                response.status(404).json({
                    message: "Aucun album de ce titre n'a été trouvé.",
                    error: err
                })
            }
        }
    })
}

//Création et export d'une méthode permettant d'ajouter de nouvelles données dans le tableau associé à ce controller
exports.createData = (request, response) =>{
    //lecture du fichier Json faisant office de base de données
    fs.readFile("./src/models/albums.json", (err, data)=>{
        //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
        if (err){
            response.status(500).json({
                message: "Erreur lors de la récupération des données",
                error:err
            })
        //Sinon on stock notre jeu de données dans une constante
        } else {
            const existingData = JSON.parse(data);
            //Si le tableau est vide on ajoute les paramètres fournis par l'utilsateur dedans avec l'ID 1
            if (existingData.greenDay === []) {
                existingData.greenDay.push({ "id": 1, "titre": request.body.titre, "année": request.body.année });
            //Sinon on ajoute les paramètres fournis par l'utilisateur et on ajoute un id correspondant à la taille du tableau + 1
            } else {
                existingData.greenDay.push({ "id": existingData.greenDay.length+1, "titre": request.body.titre, "année": request.body.année });
            }
            //Ajout des nouvelles informations dans notre jeu de données.
            fs.writeFile("./src/models/albums.json", JSON.stringify(existingData), (writeErr)=>{
                //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
                if (writeErr){
                    response.status(500).json({
                        message: "Erreur lors de l'ajout des données",
                        error: err   
                    })
                //Sinon on renvoie un code 200 
                } else {
                    response.status(200).json({
                        message: "Données ajoutées avec succès !"
                    })
                }
            });
        }
    });
};

//Création et export d'une méthode qui permet de mettre à jour un objet du tableau associé à ce controller par son id.
exports.updateData = (request, response)=>{
    //lecture du fichier Json faisant office de base de données
    fs.readFile("./src/models/albums.json", (err, data)=>{
        //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
        if (err) {
            response.status(500).json({
                message: "Erreur lors de la lecture des données",
                error: err
            })
        //Sinon on stock notre jeu de données dans une constante
        } else {
            const existingData = JSON.parse(data);
            //On recherche dans cete dernière si l'ID fourni par l'utilisateur existe au sein du tableau associé à ce controller
            const dataById = existingData.greenDay.find((obj)=> obj.id === parseInt(request.params.id));
            //Si il existe alors on remplace les données par celles fournies en paramètres:
            if (dataById) {
                //Si le titre et l'année de sortie de l'album sont fournis :
                if(request.body.titre && request.body.année){
                    dataById.titre = request.body.titre;
                    dataById.année = request.body.année;
                //si seul le titre est fourni
                } else if (request.body.titre){
                    dataById.titre = request.body.titre;
                //si seul l'année est fournie
                } else if (request.body.année){
                    dataById.année = request.body.année;
                }
                //Modification de notre jeu de données avec celles fournies par l'utilisateur
                fs.writeFile("./src/models/albums.json", JSON.stringify(existingData), (writeErr)=>{
                    //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
                    if (writeErr){
                        response.status(500).json({
                            message: "Erreur lors de l'écriture",
                            error:err
                        })        
                    //Sinon on renvoie un code 200.
                    } else {
                        response.status(200).json({
                            message: "Données modifiées avec succès !"
                        })
                    }
                });
                //Si l'utilisateur fourni un ID invalide, on renvoie un code 404 ainsi qu'un message d'erreur.
            }else {
                response.status(404).json({
                    message: "Aucun album avec cet id n'a été trouvé.",
                    error:err
                })
            }
        }
    });
};

//Création et export d'une méthode qui permet de supprimer un objet du tableau associé à ce controller par son id
exports.deleteDataById = (request, response) =>{
    //lecture du fichier Json faisant office de base de données
    fs.readFile("./src/models/albums.json", (err, data)=>{
        //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
        if (err) {
            response.status(500).json({
                message: "Erreur lors de la récupération des données",
                error:err
            })
        //Sinon on stock notre jeu de données dans une constante
        }else{
            const existingData = JSON.parse(data);
            //On recherche dans cete dernière si l'ID fourni par l'utilisateur existe au sein du tableau associé à ce controller
            const dataById = existingData.greenDay.find((obj)=> obj.id === parseInt(request.params.id));
            //Si l'utilisateur fourni un ID invalide, on renvoie un code 404 ainsi qu'un message d'erreur.
            if (!dataById){
                request.status(404).json({
                    message: "Aucun album avec cet id n'a été trouvé",
                    error: err
                })
            //Sinon on supprime l'objet correspondant grace à la méthode filter qui ne garder dans le tableau que les objets dont l'ID ne correspond pas à celui fourni par l'utilisateur
            } else {
                existingData.greenDay = existingData.greenDay.filter((obj)=> obj.id != parseInt(request.params.id));
                //Modification de notre jeu de données.
                fs.writeFile("./src/models/albums.json", JSON.stringify(existingData), (writeErr)=>{
                    //Si il y a une erreur, on renvoie un code 500 ainsi qu'un message d'erreur a l'utilisateur
                    if (writeErr){
                        response.status(500).json({
                            message: "Erreur lors de la récupération des données",
                            error: err
                        })
                    //Sinon on renvoie un code 200.
                    }else{
                        response.status(200).json({
                            message: "Album supprimé avec succès"
                        })
                    }
                });
            }
        }
    });
};