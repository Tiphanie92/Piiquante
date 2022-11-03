const passwordValidator = require("password-validator");

// Creation du schema pour le mot de passe
const passwordSchema = new passwordValidator();

// Propriété du schema
passwordSchema
  .is()
  .min(8) // Minimum 8 caractéres
  .is()
  .max(20) // Maximum 20 caractéres
  .has()
  .uppercase(1) // 1 Majuscule
  .has()
  .lowercase()
  .has()
  .digits(2) // 2 Chiffres
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist

const validator = require("email-validator");

//Vérification du Mot de passe et de l'email
module.exports = (req, res, next) => {
  if (
    passwordSchema.validate(req.body.password) &&
    validator.validate(req.body.email)
  ) {
    next();
  } else {
    return res.status(400).json({
      error: `Le mot de passe n'est pas valide ${passwordSchema.validate(
        "req.body.password",
        { list: true }
      )} ou l'email ${req.body.email} n'est pas valide`,
    });
  }
};
