const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Récupération du token
    const token = req.headers.authorization.split(" ")[1];
    // Vérifier si la clé d'auth du token est valide
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // Récupération de l'userId du token
    const userId = decodedToken.userId;
    // Déclaration de l'utilisateur qui en envoyé la requête
    req.auth = { userId };
    // Vérification de l'utilisateur
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: "Echec d'Authentification",
      error: "Invalid request!",
    });
  }
};
