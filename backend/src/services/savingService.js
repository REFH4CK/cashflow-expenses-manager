import { getSavingsStatsData } from "../models/savingStats.js";

export const processSavingsStats = async (UID, id_currency, from_date, to_date) => {
  // Validación de parámetros
  if (!UID || !id_currency) {
    throw new Error("Se requieren UID y id_currency");
  }

  const formattedStart = from_date ? new Date(from_date).toISOString().split('T')[0] : null;
  const formattedEnd = to_date ? new Date(to_date).toISOString().split('T')[0] : null;

  const rawData = await getSavingsStatsData(UID, id_currency, formattedStart, formattedEnd);
  
  const stats = {
    labels: [],
    entries: [],
    exits: [],
    currency: rawData[0]?.prefer_currency || ''
  };

  rawData.forEach(row => {
    stats.labels.push(row.month);
    stats.entries.push(row.entries);
    stats.exits.push(-Math.abs(row.exits));
  });

  // Validar que hay datos
  if (stats.labels.length === 0) {
    throw new Error("No se encontraron movimientos con los filtros aplicados");
  }

  return stats;
};