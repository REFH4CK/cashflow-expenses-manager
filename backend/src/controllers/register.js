import { regService } from "../services/regService.js";

export const register = async (req, res) => {
  const { username, password, name, email } = req.body;

  try {
    const user = await regService(username, password, name, email);
    res.status(201).json({ message: "Successfully registered!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};