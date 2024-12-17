//Importation
express = require("express")
router = express.Router();
const utils = require("../utils.js");


//Routes
router.get("/Category", async (req, res) => {
    const category = await prisma.Category.findMany({orderBy: { name: "asc"}});
    res.render("Category/indexCategory", {
        category,
    });
});


router.get("/Category/:name", async (req, res) => {  //Prends les pages par categorie grâce à *

    const category = await prisma.Category.findUnique({where: {name: req.params.name} });

    if (category) //Cela prends le document style quand je reviens sur toutes categories
    {    
        const gameOfCategory = await prisma.Game.findMany({where: {gameCategory: category.id} });
        res.render("Category/indexCategorySolo", {
            category,
            gameOfCategory
        });
    }
    else //sinon affiche blanc
    {res.render("404");}
});

module.exports = router; //export to serv.js