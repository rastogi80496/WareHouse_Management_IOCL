import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axiosInstance from "./axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StockTransactionGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/stocktransaction/getallStockTransaction");
        const transactions = response.data; // array of transactions

        // Aggregate by date and convert quantity to numbers
        const aggregated = {};
        transactions.forEach((tx) => {
          const date = new Date(tx.transactionDate).toLocaleDateString();
          if (!aggregated[date]) aggregated[date] = { stockIn: 0, stockOut: 0 };
          if (tx.type === "Stock-in") aggregated[date].stockIn += Number(tx.quantity);
          else aggregated[date].stockOut += Number(tx.quantity);
        });

        const labels = Object.keys(aggregated);
        const stockInQuantities = labels.map((date) => aggregated[date].stockIn);
        const stockOutQuantities = labels.map((date) => aggregated[date].stockOut);

        setChartData({
          labels,
          datasets: [
            {
              label: "Stock In",
              data: stockInQuantities,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              pointBackgroundColor: "#4CAF50",
              fill: true,
            },
            {
              label: "Stock Out",
              data: stockOutQuantities,
              borderColor: "#F44336",
              backgroundColor: "rgba(244, 67, 54, 0.2)",
              pointBackgroundColor: "#F44336",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "90%", maxWidth: "800px", margin: "0 auto", height: "400px" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Stock Transactions Overview</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: "rgba(200, 200, 200, 0.3)" }, ticks: { beginAtZero: true } },
            },
          }}
        />
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </div>
  );
};

export default StockTransactionGraph;