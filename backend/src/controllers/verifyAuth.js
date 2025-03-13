import jwt from "jsonwebtoken";
import { envs } from "../config/dotenv.js";

export const verifyAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET);
    const user = {
      id: decoded.id,
      name: decoded.name,
      username: decoded.username,
      email: decoded.email,
      country: decoded.country,
      spend_limit: decoded.spend_limit,
      reputation: decoded.reputation,
      join_date: decoded.join_date,
    };
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
