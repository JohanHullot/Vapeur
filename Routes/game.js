//Importation
express = require("express")
router = express.Router();
const utils = require("../utils.js");

//mise en place du stockage d'image
const stockage = require("../storageImage.js")
const upload = stockage.compilStorage();


//Routes
router.get("/Game", async (req, res) => {
    const game = await prisma.Game.findMany({orderBy: { name: "asc"}});
    res.render("Game/indexGame", {
        game,
    });
});


router.get("/Game/:name", async (req, res) => {  //Prends les pages par jeu grâce à *

    const game = await prisma.Game.findUnique({where: {name: req.params.name}});

    if (game) //Si le jeu existe
    {
        const categoryOfGame = await prisma.Category.findUnique({where: {id: game.gameCategory} });
        const editorOfGame = await prisma.Editor.findUnique({where: {id: game.gameEditor} });
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



router.post("/addGame", upload.single('picture'), async (req, res) => {  //recois le form

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
            let nameImage = "";//default No Image
            if (req.file)
                nameImage = req.file.originalname;

            utils.addGame(req.body, nameImage);
            //console.log("Pas de problème rencontrer");
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
        res.redirect("/Game/" + req.body.name);
    }
});



router.get("/editGame/:name", async (req, res) => {
    const game = await prisma.Game.findUnique({where: {name: req.params.name} });
    const categoryGame = await prisma.Category.findUnique({where: {id: game.gameCategory}}); //category actuelle
    const editorGame = await prisma.Editor.findUnique({where: {id: game.gameEditor}}); //editor actuelle

    const category = await prisma.Category.findMany({where: {id: {not: game.gameCategory}}});
    const editor = await prisma.Editor.findMany({where: {id: {not: game.gameEditor}}});
    res.render("Game/editGame", {
        game,
        category,
        editor,
        categoryGame,
        editorGame
    });
});



router.post("/editGame/:name", upload.single('picture'), async (req, res) => {

    // console.log(req.file, req.body)
    let isError = false;
    try
    {
        const gameSameName = await prisma.Game.findMany({where: {name: req.body.name}});

        if(gameSameName[0] && gameSameName[0].name != req.params.name) //Si un autre jeu que lui à le même nom 
        {
            isError = true;
            const nameError = "Le nom du jeu existe déjà";
            res.render("Game/error", {
                nameError
            });
        }
        else //sinon implementation db
        {
            let nameImage = "";//default No Image
            if (req.file)
                nameImage = req.file.originalname;

            utils.editGame(req.body, req.params.name, nameImage);
            //console.log("Pas de problème rencontrer");
        }
    }
    catch(err) //Si le try a planté
    {
        isError = true;
        console.error("Erreur dans la modification du jeu", err)
        const nameError = "Une erreur serveur a été detecté pour modifier le jeu";
        res.render("Game/error", {
            nameError
        });
    }

    if (!isError) //Si il y a eu une erreur
    {
        res.redirect("/Game/" + req.params.name);
    }
})


router.get("/suppressGame/:name", async (req, res) => {

    try
    {
        utils.suppressGame(req.params.name);
        //console.log("Pas de problème rencontrer");
        res.redirect("/Game");
    }
    catch(err) //Si le try a planté
    {
        isError = true;
        console.error("Erreur dans la suppression du jeu", err)
        const nameError = "Une erreur serveur a été detecté pour supprimer le jeu";
        res.render("Game/error", {
            nameError
        });
    }
})

router.get("/setOn/:name", async (req, res) => { //Mettre un jeu à la une
    utils.setOn(req.params.name);
    res.redirect("/Game/" + req.params.name);
})

router.get("/setOff/:name", async (req, res) => { //L'enlève de la une
    utils.setOff(req.params.name);
    res.redirect("/Game/" + req.params.name);
})

module.exports = router; //export to serv.js