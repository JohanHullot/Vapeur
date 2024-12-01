module.exports = {
    createCategoryDefault: async function () //creer les catégories demandé dans la db
    {
        const tabCategory = ["Action",
                        "Aventure",
                        "RPG",
                        "Simulation",
                        "Sport",
                        "MMORPG" ];
    
        for (indice in tabCategory) //pour chaque catégorie
        {
            const category = {
            name: tabCategory[indice],
            };
            const newcategory = await prisma.Category.create({ //Creation de la catégorie dans la db
                data: category,
            });
            console.log(tabCategory[indice]);
        }
    },

    createGameDefault: async function () //creer les catégories demandé dans la db
    {
        const tabGame = ["Faster Than Light",
                        "Into the Breach",
                        "Muck",
                        "Brotato",
                        "Minecraft",];
    
        for (indice in tabGame) //pour chaque catégorie
        {
            const game = {
            name: tabGame[indice],
            };
            const newgame = await prisma.Game.create({ //Creation de la catégorie dans la db
                data: game,
            });
            console.log(tabGame[indice]);
        }
    },

    createEditorDefault: async function () //creer les catégories demandé dans la db
    {
        const tabEditor = ["Blobfish",
                           "Dani",
                           "Subset Games",
                           "Mojang Studios"];
    
        for (indice in tabEditor) //pour chaque catégorie
        {
            const editor = {
            name: tabEditor[indice],
            };
            const neweditor = await prisma.Editor.create({ //Creation de la catégorie dans la db
                data: editor,
            });
            console.log(tabEditor[indice]);
        }
    }
};