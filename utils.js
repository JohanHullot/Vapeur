module.exports = {
    //GAME
    addGame: async function (data, namePicture) 
    {    //Ajoute un nouveau jeu à la base de donnée
        const idEditor = await prisma.Editor.findMany({where: {name: data.editor}});
        const idCategory = await prisma.Category.findMany({where: {name: data.category}});
        

        const game = {
            name: data.name,
            gameCategory: idCategory[0].id,
            gameEditor: idEditor[0].id,
            description: data.description,
            publishDate: data.date + ":00.000Z",
            nameOfImage: namePicture
        }

        const newgame = await prisma.Game.create({ //Creation du jeu dans la db
            data: game
        });
        //console.log(newgame);
    },

    editGame: async function (data, currentName, namePicture) 
    {    //Modifie le jeu souhaité dans la base de donnée
        const idEditor = await prisma.Editor.findMany({where: {name: data.editor}});
        const idCategory = await prisma.Category.findMany({where: {name: data.category}});
        
        const game = {
            name: data.name,
            gameCategory: idCategory[0].id,
            gameEditor: idEditor[0].id,
            description: data.description,
            publishDate: data.date + ":00.000Z",
            nameOfImage: namePicture
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

