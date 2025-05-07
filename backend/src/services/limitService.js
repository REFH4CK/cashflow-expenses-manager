import { limitUpdate } from "../models/limitUpdate.js";

export const limitService = async (UID, limit) => {
    if (!UID || typeof UID !== "number") {
      throw new Error("UID is invalid!");
    }
  
    const data = await limitUpdate(UID, limit);
  
    if (!data || data.length === 0) {
      throw new Error("Isn't possible to update the limit!");
    }
  
    return data;
}