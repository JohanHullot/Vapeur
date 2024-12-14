module.exports = {
    compilStorage: function()
    {
        const multer  = require('multer') //Image Saver
        // const upload = multer({ dest: 'uploads/' })
    
        //Permet d'avoir le fichier dans l'upload mais en png pas en crypter bizzare
        var storage = multer.diskStorage({ 
            destination: function (req, file, cb) {
            cb(null, './uploads')
            },
            filename: function (req, file, cb) {
            cb(null, file.originalname)
            }
        })
        var upload = multer({ storage: storage })
        return upload;
    }
};