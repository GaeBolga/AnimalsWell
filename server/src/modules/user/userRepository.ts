import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async newUser(pseudo: string, mail: string, mdp: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (pseudo, email, password) VALUES (?,?,?)",
      [pseudo, mail, mdp],
    );
    return result.insertId;
  }

  async connexion(pseudo: string, mdp: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT pseudo,id FROM user WHERE pseudo = ? AND password = ?",
      [pseudo, mdp],
    );
    if (rows.length === 0) return null;
    return rows[0];
  }
}
export default new UserRepository();
