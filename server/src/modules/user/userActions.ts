import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const inscription: RequestHandler = async (req, res) => {
  try {
    const { pseudo, mail, mdp } = req.body;

    const user = await userRepository.newUser(pseudo, mail, mdp);

    if (!user) res.status(500);
    else {
      res
        .status(201)
        .json({ user, message: "Utilisateur inscrit avec succès" });
    }
  } catch (err) {
    res.status(500).json({ err, message: "erreur lors de l'inscription" });
  }
};

export default { inscription };
