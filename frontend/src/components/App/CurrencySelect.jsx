import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export function CurrencySelect({ id, value, onChange, name = "id_currency" }) {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`http://localhost:3000/cashflow/api/ucurrencies/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch currencies");
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const loadCurrencies = async () => {
      const currencies = await fetchCurrencies();
      setCurrencyOptions(currencies);
    };
    loadCurrencies();
  }, [id]);

  return (
    <div className="flex flex-col">
      <label htmlFor="id_currency" className="text-white/50 font-lexend text-[0.90rem] font-light">
        Currency
      </label>
      <select
        name={name}
        id="id_currency"
        className={`bg-oxford-blue-700 md:w-[14rem] h-[2.5rem] text-white/65 rounded-lg p-2 px-3`}
        value={value}
        onChange={(e) => onChange(e)}
      >
        <option value="">Select currency</option>
        {currencyOptions.map((currency, i) => (
          <option key={i} value={currency.id}>
            {currency.prefer_currency}
          </option>
        ))}
      </select>
    </div>
  );
}

CurrencySelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};