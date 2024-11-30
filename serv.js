const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs")
const path = require("path");

app = express();
prisma = new PrismaClient();
PORT = 3015;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const barbarreeee = await prisma.barbarreeee.findMany();

app.get("/", async (req, res) =>
{

    res.render("index",(barbarreeee));
    console.log(barbarreeee);
    // const barbare = {
    // name: "Inception",
    // born: new Date(),
    // };

    // const newbarbare = await prisma.barbarreeee.create({
    //     data: barbare,
    // }); // retourne l'objet Movie créé avec son ID

    // res.json(barbarreeee);
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});