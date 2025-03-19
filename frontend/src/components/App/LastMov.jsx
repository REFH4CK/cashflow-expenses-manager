import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
// import { Fade } from "react-awesome-reveal";

export function LastMov({ UID }) {
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
      console.error("Error fetching last movements:", error);
      setMovements([]);
    }
  }, [UID]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return (
    <>
      <h3 className="w-full text-oxford-blue-200 font-lexend font-bold text-[25px]">
        Last movements
      </h3>
      <div className="w-full h-[0.4rem] bg-[#DE7101]/30 rounded-full mb-4"></div>
        <section className="max-w-[1440px] h-[65%] w-full bg-[#334051] rounded-3xl overflow-hidden">
          <table
            className="w-full border-oxford-blue-500 font-baloo text-[#728CB0]"
            border={1}
          >
            <tr className="border-b">
              <th className="p-[0.55rem] border-r">Quantity</th>
              <th className="p-[0.55rem] border-r">Currency</th>
              <th className="p-[0.55rem] border-r">Description</th>
              <th className="p-[0.55rem] border-r">Movement type</th>
              <th className="p-[0.55rem]">Date</th>
            </tr>
            {movements != "" ? (
              movements.map((mov, i) => (
                <tr key={i} className="text-center border-b">
                  <td className="p-[0.55rem] border-r">{mov.quantity}</td>
                  <td className="p-[0.55rem] border-r">
                    {mov.prefer_currency}
                  </td>
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
                    <p className="font-semibold mt-20">
                      You don&apos;t have recently movements friend! 🫡
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </section>
    </>
  );
}

LastMov.propTypes = {
  UID: PropTypes.number.isRequired,
};
