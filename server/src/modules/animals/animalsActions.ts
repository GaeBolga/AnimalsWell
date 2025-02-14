import type { RequestHandler } from "express";
import animalsRepository from "./animalsRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.body;
    const carnet = await animalsRepository.read(user_id);
    if (!carnet) res.status(500);
    else {
      res.status(201).json({ carnet });
    }
  } catch (err) {
    res.status(500).json({ message: " a problem occured " });
  }
};

const deleteAnimals: RequestHandler = async (req, res) => {
  try {
    const { animalId } = req.body;
    const deletedAnimal = await animalsRepository.deletedAnimal(animalId);
    if (deletedAnimal) {
      res.status(200).json({ message: "Animal deleted" });
    } else {
      res.status(404).json({ message: "Animal not found" });
    }
  } catch (err) {
    res.status(500).json({ err, message: "Error deleting animal" });
  }
};

const ajout: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      age,
      poids,
      commentaire,
      vaccin,
      vaccin_date,
      img_path,
      espece,
      race,
      user_id,
    } = req.body;
    const animals = await animalsRepository.newanimals(
      name,
      age,
      poids,
      commentaire,
      vaccin,
      vaccin_date,
      img_path,
      espece,
      race,
      user_id,
    );

    if (!animals) res.status(500);
    else {
      res
        .status(201)
        .json({ animals, message: "Utilisateur inscrit avec succès" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default { ajout, read, deleteAnimals };
