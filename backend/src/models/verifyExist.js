import { turso } from "../config/db.js";

export const verifyExist = async (user, email) => {
  const QUERY = `SELECT username, email, name FROM users WHERE  username = ? OR email = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [user, email],
  });

  return queryResult.rows;
};

export const loginUser = async (username) => {
  const QUERY = `SELECT id, name, username, email, password, country, spend_limit, reputation, join_date FROM users WHERE username = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [username]
  });

  return queryResult.rows;
};
