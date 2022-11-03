//Importation
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

//Importer package pour variables d'environnement
require("dotenv").config();

// Déclaration routes user et sauces
const userRoutes = require("./routes/User");
const saucesRoutes = require("./routes/sauces");

//Lancement express
const app = express();

//Connexion à la base de donnée Mongodb
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Convertit en JSON
app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//Configuration des en-têtes Http
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
//Multer (images)
app.use("/images", express.static(path.join(__dirname, "images")));

//logger les req et res
app.use(morgan("dev"));

//Lancement routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

//Exportation de app.js pour y accéder dans d'autre fichier
module.exports = app;
