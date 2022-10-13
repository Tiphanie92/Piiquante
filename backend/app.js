const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User");

const app = express();

// importer { MongoClient } depuis 'mongodb'
const { MongoClient } = require("mongodb");

// URL de connexion
const url =
  "mongodb+srv://Tiphanie:TqRGKOqNFkwygbba@cluster0.ahmnscv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main() {
  // Utilisation de la methode connect pour se connecter au serveur
  await client.connect();
  console.log("Connection a Mongodb réussie");
  return "terminé.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use("/api/auth", userRoutes);

module.exports = app;
