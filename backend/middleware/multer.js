// Importation de multer
const multer = require("multer");

// dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // Destination de stockage du fichier
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // Supprimer les espaces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exporation du middleware multer
module.exports = multer({ storage: storage }).single("image");
