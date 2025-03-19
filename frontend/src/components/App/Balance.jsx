import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { LineChart } from "./LineChart";
import { Fade } from "react-awesome-reveal";

export function Balance({ UID }) {
  const [balance, setBalance] = useState([]);

  const fetchUserBalance = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/cashflow/api/acc_data",
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
      setBalance(data);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance([]);
    }
  }, [UID]);

  useEffect(() => {
    fetchUserBalance();
  }, [fetchUserBalance]);

  return (
    <>
      <section className="w-full max-w-[1440px] h-full flex gap-[2rem] flex-wrap pt-8">
        <Fade cascade damping={0.2} direction="up" triggerOnce className="relative">
          {Array.isArray(balance) && balance.length > 0 ? (
            balance.map((b, i) => (
              <article
                key={i}
                className="w-[18rem] h-[22rem] bg-oxford-blue-900 rounded-3xl pt-8 overflow-hidden"
              >
                <h2 className="text-[#596F8C] font-lexend font-semibold text-3xl px-6">
                  <span className="w-[8rem] block">
                    {b.prefer_currency} Balance
                  </span>
                  <p className="text-tree-poppy-600 mt-4 text-4xl">
                    {b.total_balance}
                  </p>
                </h2>
                <LineChart></LineChart>
              </article>
            ))
          ) : (
            <div className="w-[60rem] h-[60%] flex justify-center items-center absolute">
              <p className="w-[35rem] rounded-xl bg-oxford-blue-900 p-8 text-center text-white">
                No balance data available 💀
              </p>
            </div>
          )}
        </Fade>
      </section>
    </>
  );
}

Balance.propTypes = {
  UID: PropTypes.number.isRequired,
};
