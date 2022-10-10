const express = require("express");
const app = express();
app.use(express.json());

// importer { MongoClient } depuis 'mongodb'
const { MongoClient } = require("mongodb");

// URL de connexion
const url =
  "mongodb+srv://Tiphanie:TqRGKOqNFkwygbba@cluster0.ahmnscv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// Nom de la base de donnée
const dbName = "test";

async function main() {
  // Utilisation de la methode connect pour se connecter au serveur
  await client.connect();
  console.log("Connection a Mongodb réussie");
  const db = client.db(dbName);
  const collection = db.collection("documents");
  return "terminé.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json("La requête a bien été reçue !");
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app;
