import { turso } from "../config/db.js";

export const userData = async (UID) => {
  const QUERY = `SELECT c.prefer_currency, SUM(b.balance) AS total_balance
                 FROM currency c
                 JOIN balance b ON c.id = b.id_currency
                 WHERE c.id_user = ?
                 GROUP BY c.prefer_currency;`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID],
  });

  return queryResult.rows;
};

export const lastMovs = async (UID) => {
  const QUERY = `SELECT m.quantity, m.movement_type, m.description, m.date, c.prefer_currency 
                 FROM movements AS m JOIN currency AS c ON m.id_currency = c.id
                 WHERE m.id_user = ? ORDER BY m.quantity DESC LIMIT 5;`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID],
  });

  return queryResult.rows;
};

export const profileData = async (UID) => {
  const QUERY = `SELECT * FROM profile WHERE id_user = ?`;

  try {
    const queryResult = await turso.execute({
      sql: QUERY,
      args: [UID],
    });
    return queryResult.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch profile data.");
  }
};
