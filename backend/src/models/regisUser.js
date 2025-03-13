import { turso } from "../config/db.js";

export const regisUser = async (user, password, name, email) => {
  const QUERY = `INSERT INTO users ('username', 'password', 'name', 'email')
                 VALUES (?, ?, ?, ?)`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [user, password, name, email],
  });

  return queryResult;
};
