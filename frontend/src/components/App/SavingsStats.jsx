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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, 
      },
      title: {
        display: true, 
      },
      tooltip: {
        enabled: true, 
      },
    },
    scales: {
      x: {
        display: true, 
        grid: {
          display: false, 
        },
      },
      y: {
        display: true, 
        grid: {
          display: true, 
        },
      },
    },
    elements: {
      point: {
        radius: 6, 
      },
    },
  };

  const data = {
    labels: hasData ? labels : ["No data"],
    datasets: [
      {
        label: "Exit",
        data: hasData ? exits : [0],
        borderColor: "rgba(223, 0, 0, 0.2)",
        backgroundColor: "rgba(223, 0, 0, 0.5)", 
        fill: {
          target: "start", 
          above: "rgba(223, 0, 0, 0.15)", 
          below: "rgba(223, 0, 0, 0.15)",
        },
        tension: 0.4,
      },
      {
        label: "Entry",
        data: hasData ? entries : [0],
        borderColor: "#8fbf40", 
        backgroundColor: "rgba(143, 0, 0, 0.5)", 
        fill: {
          target: "start", 
          above: "rgba(143, 191, 79, 0.2)", 
          below: "rgba(143, 191, 79, 0.2)",
        },
        tension: 0.4, 
      },
    ],
  };



  return (
    <>
      <div className="h-full w-full flex justify-center border-2 border-oxford-blue-600/50 rounded-lg bg-oxford-blue-800/20">
        {hasData ? (
          <Line options={options} data={data} />
        ) : (
          <div className="flex items-center justify-center w-[10rem] sm:w-[18rem] md:w-full mx-auto p-4 rounded-lg">
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
