import { limitService } from "../services/limitService.js";

export const limitSpend = async (req, res) => {
  const { UID, limit } = req.body;

  if (!UID || !limit) {
    return res.status(400).json({ error: "UID and limit are required!" });
  }

  try {
    const data = await limitService(UID, limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error updating spend limit:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}