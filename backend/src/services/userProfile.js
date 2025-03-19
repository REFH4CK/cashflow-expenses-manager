import { profileData } from "../models/userData.js";

export const userProfile = async (UID) => {
  const uidNumber = Number(UID);
  if (!uidNumber || isNaN(uidNumber)) {
    throw new Error("UID is invalid!");
  }

  const data = await profileData(UID);

  if (!data || data.length === 0) {
    throw new Error("No data found for the provided UID.");
  }

  return data;
};