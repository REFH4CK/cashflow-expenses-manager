import { userData } from "../models/userData.js";

export const balancesObtain = async (UID) => {
  if (!UID || typeof UID !== "number") {
    throw new Error("UID is invalid!");
  }

  const data = await userData(UID);

  if (!data || data.length === 0) {
    throw new Error("No data found for the provided UID.");
  }

  return data;
};