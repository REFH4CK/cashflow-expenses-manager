import { turso } from "../config/db.js";

export const updUserData = async (
  birthday,
  country,
  currency,
  gender,
  spendLimit,
  uid,
  reputation
) => {
  const QUERY = `UPDATE users SET country = ?, spend_limit = ?, reputation = ?, gender = ?, birthday = ? WHERE id = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [country, spendLimit, reputation, gender, birthday, uid],
  });

  await updCurrency(uid, currency);

  return queryResult.rows;
};

export const updCurrency = async (UID, currency) => {
  const QUERY = `INSERT INTO currency (id_user, prefer_currency) VALUES (?, ?)`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID, currency],
  });

  await updBalance(UID, queryResult.lastInsertRowid);

  return queryResult.rows;
};

export const updBalance = async (UID, id_currency) => {
  const QUERY = `INSERT INTO balance (id_user, id_currency, balance ) VALUES (?, ?, ?)`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID, id_currency, 0],
  });

  return queryResult.rows;
};

export const updProfileData = async (UID, description, profile_photo) => {
  try {
    let QUERY;
    let args = [];

    // Construimos la consulta dinámicamente
    const updates = [];
    if (description) {
      updates.push("description = ?");
      args.push(description);
    }
    if (profile_photo) {
      updates.push("profile_photo = ?");
      args.push(profile_photo);
    }

    if (updates.length === 0) {
      throw new Error("No se proporcionaron datos para actualizar");
    }

    QUERY = `UPDATE profile SET ${updates.join(", ")} WHERE id_user = ?`;
    args.push(UID);

    const queryResult = await turso.execute({
      sql: QUERY,
      args: args,
    });

    // Verificamos si realmente se actualizó algo
    if (queryResult.rowsAffected === 0) {
      throw new Error("No se encontró el usuario o no hubo cambios");
    }

    return { success: true, rowsAffected: queryResult.rowsAffected };
  } catch (error) {
    console.error("Error en updProfileData:", error);
    throw error;
  }
};

export const recentBalance = async (UID, id_currency) => {
  const QUERY = `SELECT balance FROM balance WHERE id_user = ? AND id_currency = ?`;

  try {
    const queryResult = await turso.execute({
      sql: QUERY,
      args: [UID, id_currency],
    });

    return queryResult.rows;
  } catch (e) {
    console.error("Database error: ", e);
    throw new Error("Failed to update balance data.");
  }
};

export const addMovement = async (
  UID,
  id_currency,
  quantity,
  mov_type,
  description,
  date
) => {
  const QUERY = `INSERT INTO movements (id_user, id_currency, movement_type, quantity, description, DATE)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  const movement_type = mov_type === "inflow" ? "income" : "expense"; // Asegúrate que sea 'expense' y no 'expense'

  try {
    const result = await turso.execute({
      sql: QUERY,
      args: [UID, id_currency, movement_type, quantity, description, date],
    });

    // Verifica que se haya insertado correctamente
    if (result.rowsAffected === 0) {
      throw new Error("No rows were inserted");
    }

    return { success: true, rowsAffected: result.rowsAffected };
  } catch (e) {
    console.error("Error in addMovement:", {
      query: QUERY,
      args: [UID, id_currency, movement_type, quantity, description, date],
      error: e,
    });
    throw new Error("Failed to add movement: " + e.message);
  }
};

export const updBalanceData = async (
  UID,
  id_currency,
  quantity,
  mov_type,
  description,
  date
) => {
  const QUERY = `UPDATE balance SET balance = ? WHERE id_user = ? AND id_currency = ?`;

  await addMovement(UID, id_currency, quantity, mov_type, description, date);

  const recent = await recentBalance(UID, id_currency);
  if (recent.length === 0) {
    throw new Error("No se encontró el balance para actualizar.");
  } else {
    let safeBalance =
      mov_type === "inflow"
        ? recent[0].balance + quantity
        : Math.max(0, recent[0].balance - quantity);

    try {
      const queryResult = await turso.execute({
        sql: QUERY,
        args: [safeBalance, UID, id_currency],
      });

      return queryResult.rows;
    } catch (e) {
      console.error("Database error: ", e);
      throw new Error("Failed to update balance data.");
    }
  }
};
