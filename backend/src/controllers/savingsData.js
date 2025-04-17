import { processSavingsStats } from "../services/savingService.js";

export const savingsStatsController = async (req, res) => {
  try {
    // Extraer y validar parámetros básicos
    const { UID, id_currency, from_date, to_date } = req.body;
    
    if (!UID || !id_currency) {
      return res.status(400).json({
        success: false,
        error: "UID y id_currency son campos requeridos"
      });
    }

    // Procesar a través del servicio
    const stats = await processSavingsStats(UID, id_currency, from_date, to_date);

    // Responder con estructura estándar
    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error("Error en savingsStatsController:", error.message);
    
    res.status(500).json({
      success: false,
      error: error.message || "Error al procesar estadísticas de ahorro"
    });
  }
};