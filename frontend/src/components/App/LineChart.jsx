import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

export function LineChart(balancesData) {
  // Registra los componentes de Chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
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
        radius: 3, // Tamaño de los puntos en la línea
      },
    },
  };

  const [labels, setLabels] = useState([]);
  const [entries, setEntries] = useState([]);
  const [exits, setExits] = useState([]);

  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Obtener la cantidad de días del mes actual
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Generar etiquetas para los días del mes actual
    const generatedLabels = Array.from(
      { length: daysInMonth },
      (_, i) => `${months[currentMonth]} - Day ${i + 1}`
    );
    setLabels(generatedLabels);

    // Procesar datos reales para entradas y salidas
    const generatedEntries = Array.from({ length: daysInMonth }, (_, day) => {
      const date = new Date(currentYear, currentMonth, day + 1).toISOString().split("T")[0];
      const inflowForDay = balancesData.balancesData.inflow
      .filter((entry) => entry.date === date)
      .reduce((acc, entry) => acc + entry.amount, 0);
      return inflowForDay || 0;
    });

    const generatedExits = Array.from({ length: daysInMonth }, (_, day) => {
      const date = new Date(currentYear, currentMonth, day + 1).toISOString().split("T")[0];
      const outflowForDay = balancesData.balancesData.outflow
      .filter((exit) => exit.date === date)
      .reduce((acc, exit) => acc + exit.amount, 0);
      return outflowForDay || 0;
    });

    setEntries(generatedEntries);
    setExits(generatedExits);
  }, [balancesData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Exit",
        data: exits,
        borderColor: "rgba(223, 0, 0, 0.2)", // Color del borde de la línea
        backgroundColor: "rgba(223, 0, 0, 0.5)", // Color de relleno semitransparente
        fill: {
          target: "start", // Rellena desde la línea hasta el eje X
          above: "rgba(223, 0, 0, 0.15)", // Color de relleno para valores positivos
          below: "rgba(223, 0, 0, 0.15)", // Color de relleno para valores negativos
        },
        tension: 0.4, // Suaviza la línea
      },
      {
        label: "Entry",
        data: entries,
        borderColor: "#8fbf40", // Color del borde de la línea
        backgroundColor: "rgba(143, 0, 0, 0.5)", // Color de relleno semitransparente
        fill: {
          target: "start", // Rellena desde la línea hasta el eje X
          above: "rgba(143, 191, 79, 0.2)", // Color de relleno para valores positivos
          below: "rgba(143, 191, 79, 0.2)", // Color de relleno para valores negativos
        },
        tension: 0.4, // Suaviza la línea
      },
    ],
  };

  return (
    <>
      <div className="sm:mt-8 md:mt-10 w-full h-fit px-3 py-4 flex items-center justify-center sm:gap-4 md:gap-0">
        <Line
          className="sm:w-[200px] sm:h-[100px]"
          options={options}
          data={data}
        ></Line>
      </div>
    </>
  );
}
