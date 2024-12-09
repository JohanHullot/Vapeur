express = require("express")
router = express.Router();
const utils = require("../utils.js"); //import local des fonctions js

router.get("/Category", async (req, res) => {
    const category = await prisma.Category.findMany();
    res.render("Category/indexCategory", {
        category,
    });
});


router.get("/Category/:name", async (req, res) => {  //Prends les pages par categorie grâce à *

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

module.exports = router; //export to serv.js