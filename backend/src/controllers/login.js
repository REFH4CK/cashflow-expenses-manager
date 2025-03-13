import { authUser } from "../services/authUser.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await authUser(username, password);
    // Envía el token como una cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // Expira en 30 días
    });

    res.status(200).json({ message: "Login successfully!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};