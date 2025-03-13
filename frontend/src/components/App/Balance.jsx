import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { faker } from '@faker-js/faker';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

export function Balance({ UID }) {
  const [balance, setBalance] = useState([]);

  // Registra los componentes de Chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
      title: {
        display: false, // Oculta el título
      },
      tooltip: {
        enabled: true, // Muestra los tooltips
      },
    },
    scales: {
      x: {
        display: false, // Oculta el eje X (etiquetas y líneas de la cuadrícula)
        grid: {
          display: false, // Oculta las líneas de la cuadrícula del eje X
        },
      },
      y: {
        display: false, // Oculta el eje Y (etiquetas y líneas de la cuadrícula)
        grid: {
          display: false, // Oculta las líneas de la cuadrícula del eje Y
        },
      },
    },
    elements: {
      point: {
        radius: 2.5, // Tamaño de los puntos en la línea
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Exit",
        data: labels.map(() =>
          faker.number.int({ min: -1000, max: 1000 })
        ),
        borderColor: "#DF4E3B", // Color del borde de la línea
        backgroundColor: "rgba(223, 78, 59, 0.2)", // Color de relleno semitransparente
        fill: {
          target: 'start', // Rellena desde la línea hasta el eje X
          above: 'rgba(223, 78, 59, 0.2)', // Color de relleno para valores positivos
          below: 'rgba(223, 78, 59, 0.2)', // Color de relleno para valores negativos
        },
        tension: 0.4, // Suaviza la línea
      },
      {
        label: "Entry",
        data: labels.map(() =>
          faker.number.int({ min: -1000, max: 1000 })
        ),
        borderColor: "#8fbf4f", // Color del borde de la línea
        backgroundColor: "rgba(143, 191, 79, 0.2)", // Color de relleno semitransparente
        fill: {
          target: 'start', // Rellena desde la línea hasta el eje X
          above: 'rgba(143, 191, 79, 0.2)', // Color de relleno para valores positivos
          below: 'rgba(143, 191, 79, 0.2)', // Color de relleno para valores negativos
        },
        tension: 0.4, // Suaviza la línea
      },
    ],
  };

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
                <p className="text-tree-poppy-600 mt-4 text-4xl">150.00</p>
              </h2>
              <div className="mt-10 w-fit h-fit px-3">
                <Line options={options} data={data} className="rounded-b-3xl" />
              </div>
            </article>
          ))
        ) : (
          <p>No balance data available.</p>
        )}
      </section>
    </>
  );
}

Balance.propTypes = {
  UID: PropTypes.number.isRequired,
};