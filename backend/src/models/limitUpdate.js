import { turso } from "../config/db.js";

export const limitUpdate = async (UID, limit) => {
  const QUERY = `UPDATE users SET spend_limit = ?, reputation = reputation - 10 WHERE id = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [limit, UID],
  });

  return queryResult;
};
