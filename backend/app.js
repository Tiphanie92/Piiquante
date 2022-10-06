const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Tiphanie:gLwfgpJcf73uoYRf@cluster0.ahmnscv.mongodb.net/?retryWrites=true&w=majority",
    {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée"));

app.use((req, res) => {
  res.json({ message: "requête bien reçue" });
});
module.exports = app;
