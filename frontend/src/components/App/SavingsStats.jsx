import PropTypes from "prop-types";
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

export function SavingsStats({ entries, exits, labels }) {

  const hasData =
  entries?.length > 0 && exits?.length > 0 && labels?.length > 0;
  
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
        display: true, // Oculta la leyenda
      },
      title: {
        display: true, // Oculta el título
      },
      tooltip: {
        enabled: true, // Muestra los tooltips
      },
    },
    scales: {
      x: {
        display: true, // Oculta el eje X (etiquetas y líneas de la cuadrícula)
        grid: {
          display: false, // Oculta las líneas de la cuadrícula del eje X
        },
      },
      y: {
        display: true, // Oculta el eje Y (etiquetas y líneas de la cuadrícula)
        grid: {
          display: true, // Oculta las líneas de la cuadrícula del eje Y
        },
      },
    },
    elements: {
      point: {
        radius: 6, // Tamaño de los puntos en la línea
      },
    },
  };

  const data = {
    labels: hasData ? labels : ["No data"],
    datasets: [
      {
        label: "Exit",
        data: hasData ? exits : [0],
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
        data: hasData ? entries : [0],
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
      <div className="h-full w-full">
        {hasData ? (
          <Line options={options} data={data} />
        ) : (
          <div className="flex items-center justify-center mt-[14rem] bg-tree-poppy-600/20 w-[18rem] mx-auto p-4 rounded-lg">
            <p className="text-white/85">
              No data available for selected filters
            </p>
          </div>
        )}
      </div>
    </>
  );
}

SavingsStats.propTypes = {
  entries: PropTypes.array,
  exits: PropTypes.array,
  labels: PropTypes.array,
};
