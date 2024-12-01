const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs");
const path = require("path");
const utils = require("./utils.js");


app = express();
prisma = new PrismaClient();
PORT = 3015;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


app.get("/", async (req, res) =>
{
    //utils.createCategory(); Données implémentées dans la db

    const category = await prisma.Category.findMany(); //Trouve tout les jeux de la base de donnees

    res.render("index",{    //index.hbs est afficher sur le site
        category,
    });
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
