//Importation et mise en lien
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs");
const path = require("path");
const { console } = require("inspector"); //import le console pour log


//Routes local
const editorRouter = require("./Routes/editor.js");
const gameRouter  = require("./Routes/game.js");
const categoryRouter  = require("./Routes/category.js");


//Preparation des modules
app = express();
prisma = new PrismaClient();
PORT = 3015;

hbs.registerPartials(path.join(__dirname, "/views/partials")); //Donne les chemins des partials
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); //Donne le chemin des views que va utiliser app

app.use(express.urlencoded({ extended: true })); // permet de recevoir les posts des forms

//Fichier Public
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));


//Routes

app.get("/", async (req, res) =>
{
    const game = await prisma.Game.findMany({where: {inMainPage: true}}); //Trouve tout les jeux de la base de donnees

    res.render("index",{    //index.hbs est afficher sur le site
        game,
    });
})

app.post("/search/", (req, res) =>
{
    res.redirect("/search/" + req.body.search)
})

app.get("/search/:data", async (req, res) =>
{
    const game = await prisma.Game.findMany({where: {name: {contains: req.params.data}}});
    const editor = await prisma.Editor.findMany({where: {name: {contains: req.params.data}}});
    const category = await prisma.Category.findMany({where: {name: {contains: req.params.data}}});

    res.render("search", {
        game,
        editor,
        category
    })
})


//CATEGORY
app.use(categoryRouter); //Routes category

//GAME
app.use(gameRouter); //Routes game

//EDITOR
app.use(editorRouter); //Routes editor

//Connexion au Port 3015
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});