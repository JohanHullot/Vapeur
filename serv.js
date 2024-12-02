//Importation et mise en lien
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs");
const path = require("path");
const utils = require("./utils.js"); //import local
//
//Preparation des modules
app = express();
prisma = new PrismaClient();
PORT = 3015;

hbs.registerPartials(path.join(__dirname, "/views/partials")); //Donne les chemins des partials
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); //Donne le chemin des views que va utiliser app

app.use(express.static("public"));//Fichier de /public/ deviennent visible pour toutes les routes


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
app.get("/Category/", async (req, res) => {
    const category = await prisma.Category.findMany();
    res.render("Category/indexCategory", {
        category,
    });
});


app.get("/Category/:name/", async (req, res) => {  //Prends les pages par categorie grâce à *

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
    else
    {res.send()} //sinon affiche blanc
});

app.get("/addGame", async (req, res) => {
    const game = await prisma.Game.findMany();
    res.render("Game/addGame", {
        game,
    });
});


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
    else //sinon affiche blanc
    {res.send()}
});


//Connexion au Port 3015
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});