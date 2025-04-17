import { userData } from "../models/userData.js";

export const balancesObtain = async (UID, month) => {
  if (!UID || typeof UID !== "number") {
    throw new Error("UID is invalid!");
  }

  const data = await userData(UID, month);

  if (!data || data.length === 0) {
    throw new Error("No data found for the provided UID.");
  }

  return data;
};