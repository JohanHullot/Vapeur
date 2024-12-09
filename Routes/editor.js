express = require("express")
router = express.Router();
const utils = require("../utils.js"); //import local des fonctions js



router.get("/Editor", async (req, res) => {
    const editor = await prisma.Editor.findMany();
    res.render("Editor/indexEditor", {
        editor,
    });
});



router.get("/Editor/:name", async (req, res) => {  //Prends les pages par editeur grâce à *
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



router.get("/addEditor", (req, res) => {
    res.render("Editor/addEditor",{});
});



router.post("/addEditor", async (req, res) => {  //recois le form

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



router.get("/editEditor/:name", async (req, res) => {
    const editor = await prisma.Editor.findMany({where: {name: req.params.name} });
    res.render("Editor/editEditor",{editor});
});



router.post("/editEditor/:name", async (req, res) => {  //recois le form

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
        res.redirect("/Editor");
    }
});



router.get("/suppressEditor/:name", async (req, res) => {
    try
    {
        utils.suppressEditor(req.params.name);
        res.redirect("/Editor");
    }
    catch (error)
    {
        console.error(error);
        const nameError = "Une erreur serveur a été detecté pour supprimer l'éditeur";
        res.render("/Editor/", {
            nameError
        })
    }
})

module.exports = router; //export to serv.js