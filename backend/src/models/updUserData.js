import { turso } from "../config/db.js";

export const updUserData = async (birthday, country, currency, gender, spendLimit, uid, reputation) => {
  const QUERY = `UPDATE users SET country = ?, spend_limit = ?, reputation = ?, gender = ?, birthday = ? WHERE id = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [country, spendLimit, reputation, gender, birthday, uid],
  });

  console.log("Model", { country, spendLimit, reputation, gender, birthday, uid });

  await updCurrency(uid, currency);

  return queryResult.rows;
};

export const updCurrency = async (UID, currency) => {
  const QUERY = `INSERT INTO currency (id_user, prefer_currency) VALUES (?, ?)`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID, currency],
  });

  return queryResult.rows;
};