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
app.use(categoryRouter);

//GAME
app.use(gameRouter); //Routes game

//EDITOR
app.use(editorRouter); //Routes editor

//Handicapy
//Vous aimez les capybaras ? Oui, alors ce jeu est fait pour vous ! Dans Handicapy vous incarnez un capybara, votre but est d'aider des capybara handicapé et de combattre des prédateurs pour avancer dans le jeu !

//Connexion au Port 3015
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});