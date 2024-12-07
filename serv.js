//Importation et mise en lien
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs");
const path = require("path");
const utils = require("./utils.js"); //import local des fonctions js
const { console } = require("inspector");
//
//Preparation des modules
app = express();
prisma = new PrismaClient();
PORT = 3015;

hbs.registerPartials(path.join(__dirname, "/views/partials")); //Donne les chemins des partials
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); //Donne le chemin des views que va utiliser app

app.use(express.static("public")); //Fichier de /public/ deviennent visible pour toutes les routes

app.use(express.urlencoded({ extended: true })); // permet de recevoir les posts des forms

//Routes

app.get("/", async (req, res) =>
{
    //utils.createCategoryDefault(); //Données implémentées dans la db
    //utils.createEditorDefault();
    //utils.createGameDefault();

    const category = await prisma.Category.findMany(); //Trouve tout les jeux de la base de donnees

    res.render("index",{    //index.hbs est afficher sur le site
        category,
    });
})


//CATEGORY
app.get("/Category", async (req, res) => {
    const category = await prisma.Category.findMany();
    res.render("Category/indexCategory", {
        category,
    });
});


app.get("/Category/:name", async (req, res) => {  //Prends les pages par categorie grâce à *

    const category = await prisma.Category.findMany({where: {name: req.params.name} });

    if (category[0]) //Cela prends le document style quand je reviens sur toutes categories
    {    
        const gameOfCategory = await prisma.Game.findMany({where: {gameCategory: category[0].id} });
        res.render("Category/indexCategorySolo", {
            category,
            gameOfCategory
        });
    }
    else //sinon affiche blanc
    {res.send()}
});



//GAME
app.get("/Game", async (req, res) => {
    const game = await prisma.Game.findMany();
    res.render("Game/indexGame", {
        game,
    });
});

app.get("/Game/:name", async (req, res) => {  //Prends les pages par jeu grâce à *

    const game = await prisma.Game.findMany({where: {name: req.params.name} });

    if (game[0]) //Si le jeu existe
    {
        const categoryOfGame = await prisma.Category.findMany({where: {id: game[0].gameCategory} });
        const editorOfGame = await prisma.Editor.findMany({where: {id: game[0].gameEditor} });
        res.render("Game/indexGameSolo", {
            game,
            categoryOfGame,
            editorOfGame
        });
    }
    else //sinon affiche 404
    {
        res.render("404");
    }
});

app.get("/addGame", async (req, res) => {
    const category = await prisma.Category.findMany();
    const editor = await prisma.Editor.findMany();
    res.render("Game/addGame", {
        category,
        editor
    });
});

app.post("/addGame", async (req, res) => {  //recois le form

    let isError = false;
    try
    {
        const gameSameName = await prisma.Game.findMany({where: {name: req.body.name}});

        if(gameSameName[0]) //Erreur un jeu a le meme nom
        {
            isError = true;
            const nameError = "Le nom du jeu existe déjà";
            res.render("Game/error", {
                nameError
            });
        }
        else //sinon implementation db
        {
            utils.addGame(req.body);
            console.log("Pas de problème rencontrer");
        }
    }
    catch(err) //Si le try a planté
    {
        isError = true;
        console.error("Erreur dans l'ajout du jeu", err)
        const nameError = "Une erreur serveur a été detecté pour ajouter le jeu";
        res.render("Game/error", {
            nameError
        });
    }

    if (!isError) //Si il y a eu une erreur
    {
        res.statuts(200).redirect("/Game");
    }
});

app.get("/editGame", async (req, res) => {
    const category = await prisma.Category.findMany();
    const editor = await prisma.Editor.findMany();
    res.render("Game/editGame", {
        category,
        editor
    });
});

app.post("/editGame", async (req, res) => {

    res.send();
})

app.post("/suppressGame", async (req, res) => {

    res.send();
})


//EDITOR
app.get("/Editor", async (req, res) => {
    const editor = await prisma.Editor.findMany();
    res.render("Editor/indexEditor", {
        editor,
    });
});

app.get("/Editor/:name", async (req, res) => {  //Prends les pages par editeur grâce à *
    const editor = await prisma.Editor.findMany({where: {name: req.params.name} });
    if (editor[0]) //Cela prends le document style quand je reviens sur toutes categories
    {   
        const gameOfEditor = await prisma.Game.findMany({where: {gameEditor: editor[0].id} });
        res.render("Editor/indexEditorSolo", {
            editor,
            gameOfEditor
        });
    }
    else //sinon affiche 404
    {
        res.render("404");
    }
});

app.get("/addEditor", (req, res) => {
    res.render("Editor/addEditor",{});
});

app.post("/addEditor", async (req, res) => {  //recois le form

    let isError = false;
    try
    {
        const editorSameName = await prisma.Editor.findMany({where: {name: req.body.name}});

        if(editorSameName[0]) //Erreur un éditeur a déjà ce nom
        {
            isError = true;
            const nameError = "L'éditeur existe déjà";
            res.render("Editor/error", {
                nameError
            });
        }
        else //sinon implementation db
        {
            utils.addEditor(req.body);
            console.log("Pas de problème rencontrer");
        }
    }
    catch(err) //Si le try a planté
    {
        isError = true;
        console.error("Erreur dans l'ajout de l'éditeur", err)
        const nameError = "Une erreur serveur a été detecté pour ajouter l'éditeur";
        res.render("Editor/error", {
            nameError
        });
    }

    if (!isError) //Si il y a eu une erreur
    {
        res.redirect("/Editor");
    }
});

app.get("/editEditor/:name", async (req, res) => {
    const editor = await prisma.Editor.findMany({where: {name: req.params.name} });
    res.render("Editor/editEditor",{editor});
});

app.post("/editEditor/:name", async (req, res) => {  //recois le form

    let isError = false;
    try
    {
        const editorSameName = await prisma.Editor.findMany({where: {name: req.body.name}});

        if(editorSameName[0]) //Erreur un éditeur a déjà ce nom
        {
            isError = true;
            const nameError = "L'éditeur existe déjà";
            res.render("Editor/error", {
                nameError
            });
        }
        else //sinon implementation db
        {
            utils.editEditor(req.body,req.params.name);
            console.log("Pas de problème rencontrer");
        }
    }
    catch(err) //Si le try a planté
    {
        isError = true;
        console.error("Erreur dans la modification de l'éditeur", err)
        const nameError = "Une erreur serveur a été detecté pour modifier l'éditeur";
        res.render("Editor/error", {
            nameError
        });
    }

    if (!isError) //Si il y a eu une erreur
    {
        res.statuts(200).redirect("/Editor");
    }
});

app.get("/suppressEditor/:name", async (req, res) => {
    try
    {
        utils.suppressEditor(req.params.name);
        res.status(200).redirect("/Editor");
    }
    catch (error)
    {
        console.error(error);
        const nameError = "Une erreur serveur a été detecté pour supprimer l'éditeur";
        res.status(500).render("/Editor/", {
            nameError
        })
    }
})

//Handicapy
//Vous aimez les capybaras ? Oui, alors ce jeu est fait pour vous ! Dans Handicapy vous incarnez un capybara, votre but est d'aider des capybara handicapé et de combattre des prédateurs pour avancer dans le jeu !

//Connexion au Port 3015
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});