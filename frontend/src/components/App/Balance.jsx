import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { LineChart } from "./LineChart";
import { Fade } from "react-awesome-reveal";

export function Balance({ UID }) {
  const [balance, setBalance] = useState([]);
  
  const fetchUserBalance = useCallback(async () => {
    const currentMonth = new Date().getMonth() + 1;
    try {
      const response = await fetch(
        "http://localhost:3000/cashflow/api/acc_data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UID: UID, month: currentMonth }),
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
      <section className="w-full max-w-[1440px] h-[36rem] flex sm:justify-center md:justify-normal gap-[2rem] flex-wrap pt-8">
        <Fade cascade damping={0.1} direction="up" triggerOnce className="relative">
          {Array.isArray(balance) && balance.length > 0 ? (
            balance.map((b, i) => (
              <article
                key={i}
                className="sm:w-[24rem] sm:h-[10rem] md:w-[18rem] md:h-[22rem] bg-oxford-blue-900 rounded-3xl sm:pt-4 md:pt-8 overflow-hidden sm:flex md:block"
              >
                <h2 className="text-[#596F8C] font-lexend font-semibold text-3xl sm:pr-0 px-6">
                  <span className="md:w-[8rem] sm:text-[1.30rem] md:text-3xl block">
                    {b.prefer_currency} Balance
                  </span>
                  <p className="text-tree-poppy-600 mt-4 sm:text-[2rem] md:text-4xl">
                    {b.total_balance}
                  </p>
                </h2>
                <LineChart balancesData={b} />
              </article>
            ))
          ) : ('')}
        </Fade>
      </section>
    </>
  );
}

Balance.propTypes = {
  UID: PropTypes.number.isRequired,
};
