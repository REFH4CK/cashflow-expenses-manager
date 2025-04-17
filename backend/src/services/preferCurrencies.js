import { prefersCurrencies } from "../models/userData.js";

export const preferCurrencies = async (UID) => {
  const uidNumber = Number(UID);

  if (!uidNumber || isNaN(uidNumber)) {
    throw new Error("UID is invalid!");
  }

  const data = await prefersCurrencies(uidNumber);

  if (!data || data.length === 0) {
    throw new Error("No data found for the provided UID.");
  }

  return data;
};