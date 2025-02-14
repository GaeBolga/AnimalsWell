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
    res.status(500).json({ err, message: "une erreur est subvenue." });
  }
};
const connexion: RequestHandler = async (req, res) => {
  try {
    const { pseudo, mdp } = req.body;
    const user = await userRepository.connexion(pseudo, mdp);

    if (!user) {
      res.status(401).json({ message: "Identifiants incorrects" });
    }

    res.status(200).json({ user, message: "Utilisateur connecté avec succès" });
  } catch (err) {
    res.status(500).json({ err, message: "Erreur lors de la connexion" });
  }
};
export default { inscription, connexion };
