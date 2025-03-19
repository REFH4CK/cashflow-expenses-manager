import { balancesObtain } from "../services/balancesObtain.js";
import { lastMovements } from "../services/lastMovements.js";
import { userProfile } from "../services/userProfile.js";

export const accountData = async (req, res) => {
  const { UID } = req.body;

  try {
    const userData = await balancesObtain(UID);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const lastMovementsData = async (req, res) => {
  const { UID } = req.body;

  try {
    const userData = await lastMovements(UID);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userProfileData = async (req, res) => {
  const { UID } = req.params;

  if (!UID) {
    return res.status(400).json({ error: "UID is required!" });
  }

  try {
    const userData = await userProfile(UID);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};