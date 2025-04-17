import { profileData } from "../models/userData.js";
import { updProfileData } from "../models/updUserData.js";

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

export const profileChanges = async (UID, description, profile_photo) => {
  const uidNumber = Number(UID);
  if (!uidNumber || isNaN(uidNumber)) {
    throw new Error("UID inválido");
  }

  // Validación adicional de datos
  if (description && description.length > 500) {
    throw new Error("La descripción no puede exceder los 500 caracteres");
  }

  const data = await updProfileData(UID, description, profile_photo);

  if (!data || data.rowsAffected === 0) {
    throw new Error("No se pudo actualizar el perfil");
  }

  return data;
};