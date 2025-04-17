import { turso } from "../config/db.js";

export const getSavingsStatsData = async (UID, id_currency, from_date, to_date) => {
  // Consulta SQL para obtener estadísticas agrupadas por mes
  let QUERY = `
    SELECT 
      strftime('%Y-%m', m.date) AS month,
      SUM(CASE WHEN m.movement_type = 'income' THEN m.quantity ELSE 0 END) AS entries,
      SUM(CASE WHEN m.movement_type = 'expense' THEN m.quantity ELSE 0 END) AS exits,
      c.prefer_currency
    FROM movements AS m
    JOIN currency AS c ON m.id_currency = c.id
    WHERE m.id_user = ? AND m.id_currency = ?
  `;

  const args = [UID, id_currency];

  // Añadir filtro de fechas si están presentes
  if (from_date && to_date) {
    QUERY += ` AND m.date BETWEEN ? AND ?`;
    args.push(from_date, to_date);
  }

  // Agrupar por mes y moneda, ordenar cronológicamente
  QUERY += ` GROUP BY month, c.prefer_currency ORDER BY month`;

  try {
    const result = await turso.execute({ sql: QUERY, args });
    return result.rows;
  } catch (error) {
    console.error("Database error in getSavingsStatsData:", {
      query: QUERY,
      args,
      error
    });
    throw new Error("Error al obtener estadísticas de ahorros");
  }
};