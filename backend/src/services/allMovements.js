import { allMovs } from "../models/userData.js";

export const lastMovements = async (
  UID,
  date,
  description,
  id_currency,
  movement_type,
  page = 1,
  perPage = 10
) => {
  const uidNumber = Number(UID);
  if (isNaN(uidNumber)) {
    throw new Error("UID must be a valid number");
  }

  const idCurrency = id_currency ? Number(id_currency) : null;
  if (id_currency && isNaN(idCurrency)) {
    throw new Error("Currency ID must be a valid number");
  }

  // Validación de paginación
  const pageNumber = Number(page) || 1;
  const perPageNumber = Number(perPage) || 10;

  if (pageNumber < 1) throw new Error("Page must be greater than 0");
  if (perPageNumber < 1 || perPageNumber > 50) {
    throw new Error("Items per page must be between 1 and 50");
  }

  // Obtener datos
  const result = await allMovs(
    {
      UID: uidNumber,
      date: date,
      description: description,
      id_currency: idCurrency,
      movement_type: movement_type,
    },
    pageNumber,
    perPageNumber
  );

  if (!result || result.data.length === 0) {
    throw new Error("No data found for the provided filters.");
  }

  return result;
};
