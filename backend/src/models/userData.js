import { turso } from "../config/db.js";

export const userData = async (UID) => {
  const QUERY = `SELECT prefer_currency FROM currency WHERE id_user = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID],
  });
  
  return queryResult.rows;
};
