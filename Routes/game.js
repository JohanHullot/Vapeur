express = require("express")
router = express.Router();
const utils = require("../utils.js"); //import local des fonctions js

router.get("/Game", async (req, res) => {
    const game = await prisma.Game.findMany();
    res.render("Game/indexGame", {
        game,
    });
});

router.get("/Game/:name", async (req, res) => {  //Prends les pages par jeu grâce à *

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

router.get("/addGame", async (req, res) => {
    const category = await prisma.Category.findMany();
    const editor = await prisma.Editor.findMany();
    res.render("Game/addGame", {
        category,
        editor
    });
});

router.post("/addGame", async (req, res) => {  //recois le form

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
        res.redirect("/Game");
    }
});

router.get("/editGame", async (req, res) => {
    const category = await prisma.Category.findMany();
    const editor = await prisma.Editor.findMany();
    res.render("Game/editGame", {
        category,
        editor
    });
});

router.post("/editGame", async (req, res) => {

    res.send();
})

router.post("/suppressGame", async (req, res) => {

    res.send();
})

module.exports = router; //export to serv.js