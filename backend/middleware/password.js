const passwordValidator = require("password-validator");

// Create a schema
const passwordSchema = new passwordValidator();

const validator = require("email-validator");

// Add properties to it
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 20
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

//Vérification du Mot de passe celon le schéma
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
      )}`,
    });
  }
};
