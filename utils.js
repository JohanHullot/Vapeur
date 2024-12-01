module.exports = {
    createCategory: async function () //creer les catégories demandé dans la db
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
    }
};