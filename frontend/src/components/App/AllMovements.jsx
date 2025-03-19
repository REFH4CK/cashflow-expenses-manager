import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export function AllMovements({ UID }) {
  const [movements, setMovements] = useState([]);

  const fetchMovements = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/cashflow/api/last_movs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UID: UID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMovements(data);
    } catch (error) {
      console.error("Error fetching all movements:", error);
      setMovements([]);
    }
  }, [UID]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  // Los datos para mostrar en los allmovements es un total de 13 registros por pagina

  return (
    <>
      <table
        className="w-full border-oxford-blue-600/50 font-baloo text-[#728CB0]"
        border={1}
      >
        <thead>
          <tr className="border-b border-oxford-blue-600/50">
            <th className="p-[0.55rem] border-r border-oxford-blue-600/50">
              Quantity
            </th>
            <th className="p-[0.55rem] border-r border-oxford-blue-600/50">
              Income type
            </th>
            <th className="p-[0.55rem] border-r border-oxford-blue-600/50">
              Currency
            </th>
            <th className="p-[0.55rem] border-r border-oxford-blue-600/50">
              Description
            </th>
            <th className="p-[0.55rem]">Date</th>
          </tr>
        </thead>
        <tbody>
          {movements != "" ? (
            movements.map((mov, i) => (
              <tr key={i} className="text-center border-b">
                <td className="p-[0.55rem] border-r">{mov.quantity}</td>
                <td className="p-[0.55rem] border-r">{mov.prefer_currency}</td>
                <td className="p-[0.55rem] border-r">{mov.description}</td>
                <td className="p-[0.55rem] border-r capitalize">
                  {mov.movement_type}
                </td>
                <td className="p-[0.58rem]">{mov.DATE}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} rowSpan={5}>
                <div className="flex w-full justify-center">
                  <p className="font-semibold mt-56 text-xl">
                    You don&apos;t have movements friend! 🫡
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

AllMovements.propTypes = {
  UID: PropTypes.number.isRequired,
};
