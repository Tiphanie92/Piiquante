const sauces = require("../models/sauces");
const fs = require("fs");
exports.createSauces = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce enregistrée !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
exports.getOneSauces = (req, res, next) => {
  sauces
    .findOne({
      _id: req.params.id,
    })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauces = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete sauceObject._userId;
  sauces
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "Unauthorized request" });
      } else {
        sauces
          .updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
          .then(() => res.status(200).json({ message: "Sauce modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauces = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "Unauthorized request" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          sauces
            .deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
exports.getAllSauces = (req, res, next) => {
  sauces
    .find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likeSauces = (req, res, next) => {
  // Si Like = 1, l'utilisateur like
  if (req.body.like == 1) {
    sauces
      .findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce.usersLiked.includes(req.body.userId)) {
          sauces
            .updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
            .then(() => res.status(201).json({ message: "Like ajoutée" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
  // Si like = 0, l'utilisateur annule son like
  if (req.body.like == 0) {
    sauces
      .findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          sauces
            .updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: {
                  usersLiked: req.body.userId,
                },
              }
            )
            .then(() => res.status(201).json({ message: "Like annulé" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
  // annulation du dislike
  if (req.body.like == 0) {
    sauces
      .findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersDisliked.includes(req.body.userId)) {
          sauces
            .updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: {
                  usersDisliked: req.body.userId,
                },
              }
            )
            .then(() => res.status(201).json({ message: "dislike annulé" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
  // Si like = -1, l'utilisateur dislike
  if (req.body.like == -1) {
    sauces
      .findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce.usersLiked.includes(req.body.userId)) {
          sauces
            .updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
            .then(() => res.status(201).json({ message: "Dislike ajouté" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
