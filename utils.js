module.exports = {
    // createCategoryDefault: async function () //creer les catégories demandé dans la db
    // {
    //     const tabCategory = ["Action",
    //                     "Aventure",
    //                     "RPG",
    //                     "Simulation",
    //                     "Sport",
    //                     "MMORPG" ];
    
    //     for (indice in tabCategory) //pour chaque catégorie
    //     {
    //         const category = {
    //         name: tabCategory[indice],
    //         };
    //         const newcategory = await prisma.Category.create({ //Creation de la catégorie dans la db
    //             data: category,
    //         });
    //         console.log(tabCategory[indice]);
    //     }
    // },

    // createGameDefault: async function () //creer les jeux demandé dans la db
    // {
    //     const tabGame = [["Faster Than Light",4,3,"Ce jeu de simulation spatiale de type rogue-like vous permet de piloter votre vaisseau dans une galaxie générée aléatoirement où vous pourrez vous couvrir de gloire... si vous parvenez à éviter la défaite."],
    //                      ["Into the Breach",1,3,"Contrôlez de puissants Mechas venus du futur pour vaincre une terrible menace extraterrestre. Chaque tentative faite pour sauver le monde est un nouveau défi généré aléatoirement dans ce jeu de stratégie au tour par tour."],
    //                      ["Muck",3,2,"Muck est un jeu de type roguelike de survie. Collectez des ressources, trouvez des objets et construisez une base pour survivre aussi longtemps que possible."],
    //                      ["Brotato",1,1,"Brotato est un roguelite où vous incarnez une pomme de terre maniant jusqu'à 6 armes à la fois pour combattre des hordes d'extraterrestres. Choisissez parmi une variété de traits et d'objets pour créer des parties uniques et survivre jusqu'à l'arrivée des secours."],
    //                      ["Minecraft",2,4,"Minecraft est un jeu d'aventure type bac à sable dans lequel vous pouvez créer des mondes et affronter des monstres."]];
    
    //     for (indice in tabGame) //pour chaque catégorie
    //     {
    //         const game = {
    //         name: tabGame[indice][0],
    //         gameCategory: tabGame[indice][1],
    //         gameEditor: tabGame[indice][2],
    //         description: tabGame[indice][3]
    //         };
    //         const newgame = await prisma.Game.create({ //Creation des jeux dans la db
    //             data: game,
    //         });
    //         console.log(tabGame[indice]);
    //     }
    // },

    // createEditorDefault: async function () //creer les editeurs demandé dans la db
    // {
    //     const tabEditor = ["Blobfish",
    //                        "Dani",
    //                        "Subset Games",
    //                        "Mojang Studios"];
    
    //     for (indice in tabEditor) //pour chaque catégorie
    //     {
    //         const editor = {
    //         name: tabEditor[indice],
    //         };
    //         const neweditor = await prisma.Editor.create({ //Creation des editeurs dans la db
    //             data: editor,
    //         });
    //         console.log(tabEditor[indice]);
    //     }
    // },

    //GAME
    addGame: async function (data) 
    {    //Ajoute un nouveau jeu à la base de donnée
        const idEditor = await prisma.Editor.findMany({where: {name: data.editor}});
        const idCategory = await prisma.Category.findMany({where: {name: data.category}});
        

        const game = {
            name: data.name,
            gameCategory: idCategory[0].id,
            gameEditor: idEditor[0].id,
            description: data.description,
            publishDate: data.date + ":00.000Z"
        }

        const newgame = await prisma.Game.create({ //Creation du jeu dans la db
            data: game
        });
        //console.log(newgame);
    },

    editGame: async function (data, currentName) 
    {    //Modifie le jeu souhaité dans la base de donnée
        const idEditor = await prisma.Editor.findMany({where: {name: data.editor}});
        const idCategory = await prisma.Category.findMany({where: {name: data.category}});
        
        const game = {
            name: data.name,
            gameCategory: idCategory[0].id,
            gameEditor: idEditor[0].id,
            description: data.description,
            publishDate: data.date + ":00.000Z"
        }

        const updategame = await prisma.Game.update({ //Modification du jeu dans la db
            where: { name: currentName },
            data: game
        });
    },

    suppressGame: async function (currentName)
    {   //Supprime l'éditeur donné

        const suprgame = await prisma.Game.delete({ //Suppression du jeu dans la db
            where: { name: currentName }
        });
    },

    setOn: async function (nameGame)
    {
        const game = {
            inMainPage: true
        }

        const updateGame = await prisma.Game.update({ //Modification pour mettre à la une
            where: { name: nameGame },
            data: game
        });
    },

    setOff: async function (nameGame)
    {
        const game = {
            inMainPage: false
        }

        const updateGame = await prisma.Game.update({ //Modification pour enlever de la une
            where: { name: nameGame },
            data: game
        });
    },




    //EDITOR
    addEditor: async function (data) 
    {    //Ajoute un nouvel éditeur à la base de donnée        
        const editor = {
            name: data.name
        }

        const neweditor = await prisma.Editor.create({ //Creation de l'editeur dans la db
            data: editor
        });
        //console.log(neweditor);
    },


    editEditor: async function (data,currentName) 
    {    //Modifie le jeu souhaité dans la base de donnée       
        const editor = {
            name: data.name
        }

        const updateditor = await prisma.Editor.update({ //Modification de l'editeur dans la db
            where: { name: currentName },
            data: editor,
        });
    },

    suppressEditor: async function (currentName)
    {   //Supprime l'éditeur donné

        const supreditor = await prisma.Editor.delete({ //Suppression de l'editeur dans la db
            where: { name: currentName }
        });
    }
};

