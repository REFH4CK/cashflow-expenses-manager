import { updateBalance } from "../services/updateBalance.js";

export const balanceData = async (req, res) => {
  const { UID, id_currency, quantity, mov_type, description, date } = req.body;

  try {
    // Validación básica
    if (!UID || !id_currency || quantity === undefined || !mov_type) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos: UID, id_currency, balance, mov_type" 
      });
    }

    const userData = await updateBalance(UID, id_currency, quantity, mov_type, description, date);
    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error("Error en balanceData:", error);
    res.status(400).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};