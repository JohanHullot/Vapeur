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
        const tabGame = [["Faster Than Light",4,3,"Ce jeu de simulation spatiale de type rogue-like vous permet de piloter votre vaisseau dans une galaxie générée aléatoirement où vous pourrez vous couvrir de gloire... si vous parvenez à éviter la défaite."],
                         ["Into the Breach",1,3,"Contrôlez de puissants Mechas venus du futur pour vaincre une terrible menace extraterrestre. Chaque tentative faite pour sauver le monde est un nouveau défi généré aléatoirement dans ce jeu de stratégie au tour par tour."],
                         ["Muck",3,2,"Muck est un jeu de type roguelike de survie. Collectez des ressources, trouvez des objets et construisez une base pour survivre aussi longtemps que possible."],
                         ["Brotato",1,1,"Brotato est un roguelite où vous incarnez une pomme de terre maniant jusqu'à 6 armes à la fois pour combattre des hordes d'extraterrestres. Choisissez parmi une variété de traits et d'objets pour créer des parties uniques et survivre jusqu'à l'arrivée des secours."],
                         ["Minecraft",2,4,"Minecraft est un jeu d'aventure type bac à sable dans lequel vous pouvez créer des mondes et affronter des monstres."]];
    
        for (indice in tabGame) //pour chaque catégorie
        {
            const game = {
            name: tabGame[indice][0],
            gameCategory: tabGame[indice][1],
            gameEditor: tabGame[indice][2],
            description: tabGame[indice][3]
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