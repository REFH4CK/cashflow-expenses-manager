import { lastMovements } from "../services/allMovements.js";

export const movementsReport = async (req, res) => {
  try {
    const { 
      UID, 
      date, 
      description, 
      id_currency, 
      movement_type,
      page = 1,
      perPage = 10
    } = req.body;

    // Validación básica
    if (!UID) {
      return res.status(400).json({ 
        success: false,
        error: "User ID is required" 
      });
    }

    const result = await lastMovements(
      UID,
      date,
      description,
      id_currency,
      movement_type,
      page,
      perPage
    );

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        perPage: result.perPage,
        totalPages: result.totalPages
      }
    });

  } catch (error) {
    console.error("Error in movementsReport:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error generating report",
    });
  }
};