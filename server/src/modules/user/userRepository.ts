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
}
export default new UserRepository();
