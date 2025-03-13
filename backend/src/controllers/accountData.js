import { balancesObtain } from "../services/balancesObtain.js";

export const accountData = async (req, res) => {
  const { UID } = req.body;

  try {
    const userData = await balancesObtain(UID);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};