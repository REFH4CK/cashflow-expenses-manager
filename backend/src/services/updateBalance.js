import { updBalanceData } from "../models/updUserData.js";

export const updateBalance = async (UID, id_currency, quantity, mov_type, description, date) => {
  // Validaciones adicionales
  if (typeof quantity !== "number" && isNaN(Number(quantity))) {
    throw new Error("Balance must be a valid number");
  }

  if (!["inflow", "outflow"].includes(mov_type)) {
    throw new Error("Invalid movement type");
  }

  const data = await updBalanceData(
    Number(UID),
    Number(id_currency),
    Number(quantity),
    mov_type,
    description, 
    date
  );

  if (!data) {
    throw new Error("Update operation failed");
  }

  return data;
};
