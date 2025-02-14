import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class AnimalsRepository {
  async newanimals(
    name: string,
    age: number,
    poids: string,
    commentaire: string,
    vaccin: boolean,
    vaccin_date: Date,
    img_path: string,
    espece: string,
    race: string,
    user_id: number,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO animals (name, age, poids, commentaire, vaccin, vaccin_date, img_path, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, age, poids, commentaire, vaccin, vaccin_date, img_path, user_id],
    );
    const [finalResult] = await databaseClient.query<Result>(
      "INSERT INTO SPECIES (espece,race,animals_id) VALUES(?,?,?)",
      [espece, race, result.insertId],
    );
    return finalResult.insertId;
  }

  async deletedAnimal(animalId: number) {
    const [result] = await databaseClient.query<Result>(
      "Delete FROM species WHERE animals_id = ?",
      [animalId],
    );
    if (result.affectedRows !== 0) {
      const [finalResult] = await databaseClient.query<Result>(
        "DELETE FROM animals WHERE id = ?",
        [animalId],
      );
      return finalResult.affectedRows;
    }
  }

  async read(user_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT a.id,a.name, a.age, a.poids, a.commentaire, a.vaccin, a.vaccin_date, a.img_path, s.espece, s.race FROM animals a JOIN species s on a.id = s.animals_id WHERE a.user_id = 6",
      [user_id],
    );
    return rows as Rows;
  }
}

export default new AnimalsRepository();
