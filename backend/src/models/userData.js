import { turso } from "../config/db.js";

export const userData = async (UID, month) => {
  // Consulta para obtener balances por moneda
  const balanceQuery = `SELECT c.prefer_currency, SUM(b.balance) AS total_balance
                       FROM currency c
                       JOIN balance b ON c.id = b.id_currency
                       WHERE c.id_user = ?
                       GROUP BY c.prefer_currency;`;

  const balanceResult = await turso.execute({
    sql: balanceQuery,
    args: [UID],
  });

  // Obtener todos los movimientos del mes
  const movements = await balancesFlow(UID, month);

  // Separar movimientos por tipo y moneda
  const movementsByCurrency = {};

  movements.forEach((movement) => {
    const { prefer_currency, movement_type, quantity, DATE } = movement;

    if (!movementsByCurrency[prefer_currency]) {
      movementsByCurrency[prefer_currency] = {
        inflow: [],
        outflow: [],
      };
    }

    if (movement_type === "income") {
      movementsByCurrency[prefer_currency].inflow.push({
        amount: quantity,
        date: DATE,
      });
    } else if (movement_type === "expense") {
      movementsByCurrency[prefer_currency].outflow.push({
        amount: quantity,
        date: DATE,
      });
    }
  });

  const result = balanceResult.rows.map((row) => {
    const { prefer_currency, total_balance } = row;
    const currencyMovements = movementsByCurrency[prefer_currency] || {
      inflow: [],
      outflow: [],
    };
    return {
      prefer_currency,
      total_balance,
      inflow: currencyMovements.inflow,
      outflow: currencyMovements.outflow,
      net_flow:
        currencyMovements.inflow.reduce((sum, item) => sum + item.amount, 0) -
        currencyMovements.outflow.reduce((sum, item) => sum + item.amount, 0),
    };
  });

  return result;
};

export const balancesFlow = async (UID, month) => {
  const QUERY = `SELECT m.id_currency, m.movement_type, m.quantity, m.DATE, c.prefer_currency
                 FROM movements AS m JOIN currency AS c ON m.id_currency = c.id
                 WHERE m.id_user = ?
                 AND strftime('%m', m.DATE) = ?`;

  const queryResult = await turso.execute({
    sql: QUERY,
    args: [UID, month],
  });

  return queryResult.rows;
};

export const lastMovs = async (UID) => {
  const QUERY = `SELECT m.quantity, m.movement_type, m.description, m.date, c.prefer_currency 
                 FROM movements AS m 
                 JOIN currency AS c ON m.id_currency = c.id
                 WHERE m.id_user = ?
                 ORDER BY m.date DESC
                 LIMIT 5`;

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

export const prefersCurrencies = async (UID) => {
  const QUERY = `SELECT id, prefer_currency FROM currency WHERE id_user = ?`;

  try {
    const queryResult = await turso.execute({
      sql: QUERY,
      args: [UID],
    });

    return queryResult.rows;
  } catch (e) {
    console.error("Database error: ", e);
    throw new Error("Failed to fetch preferred currencies.");
  }
};


export const allMovs = async (filters, page = 1, perPage = 10) => {
  let QUERY = `
    SELECT 
      m.date,
      m.description,
      m.quantity,
      m.movement_type,
      c.prefer_currency,
      COUNT(*) OVER() AS total_count
    FROM movements m
    JOIN currency c ON m.id_currency = c.id
    WHERE m.id_user = ?
  `;

  const args = [filters.UID];

  // Añadir filtros opcionales
  if (filters.date) {
    QUERY += ` AND DATE(m.date) = ?`;
    args.push(filters.date);
  }

  if (filters.description) {
    QUERY += ` AND m.description LIKE ?`;
    args.push(`%${filters.description}%`);
  }

  if (filters.id_currency) {
    QUERY += ` AND m.id_currency = ?`;
    args.push(filters.id_currency);
  }

  if (filters.movement_type) {
    QUERY += ` AND m.movement_type = ?`;
    args.push(filters.movement_type);
  }

  // Añadir paginación
  QUERY += ` 
    ORDER BY m.date DESC
    LIMIT ? OFFSET ?
  `;

  const offset = (page - 1) * perPage;
  args.push(perPage, offset);

  try {
    const queryResult = await turso.execute({
      sql: QUERY,
      args: args
    });

    return {
      data: queryResult.rows,
      total: queryResult.rows[0]?.total_count || 0,
      page,
      perPage,
      totalPages: Math.ceil((queryResult.rows[0]?.total_count || 0) / perPage)
    };

  } catch (e) {
    console.error("Database error: ", e);
    throw new Error("Failed to fetch all movements.");
  }
};