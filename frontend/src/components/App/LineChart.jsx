import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
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

export function LineChart() {
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
        radius: 3, // Tamaño de los puntos en la línea
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
    "October",
    "November",
    "December",
  ];

  // const entries = [150, 685, 125, 960, 1210, 102, 20, 25, 35, 520, 8510, 3250];

  // const exits = [-500, -598, -3205, -100, -2540, -325, -805, -120, -40, -80, -152, -350];

  const entries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const exits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


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
      <div className="mt-10 w-full h-fit px-3">
        <Line options={options} data={data} className="rounded-b-[1.8rem]"></Line>
      </div>
    </>
  );
}
