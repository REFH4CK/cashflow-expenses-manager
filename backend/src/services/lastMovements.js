import { lastMovs } from "../models/userData.js";

export const lastMovements = async (UID) => {
  if (!UID || typeof UID !== "number") {
    throw new Error("UID is invalid!");
  }

  const data = await lastMovs(UID);

  if (!data || data.length === 0) {
    throw new Error("No data found for the provided UID.");
  }

  return data;
};