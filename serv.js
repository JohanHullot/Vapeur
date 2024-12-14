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
    //utils.createCategoryDefault(); //Données implémentées dans la db
    //utils.createEditorDefault();
    //utils.createGameDefault();

    const game = await prisma.Game.findMany({where: {inMainPage: true}}); //Trouve tout les jeux de la base de donnees

    res.render("index",{    //index.hbs est afficher sur le site
        game,
    });
})


//CATEGORY
app.use(categoryRouter);

//GAME
app.use(gameRouter); //Routes game

//EDITOR
app.use(editorRouter); //Routes editor

//Connexion au Port 3015
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' }); // dossier de stockage des images

// app.post('/upload', upload.single('image'), (req, res) => {
//   const imageBuffer = req.file.buffer;
//   // Enregistrer le Buffer dans la base de données
//   // ...
//   res.send('Image uploaded successfully!');
// });