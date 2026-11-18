import React, { useEffect, useState } from "react";
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
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function FutureRevenueCard() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictedData, setPredictedData] = useState([]);

  // Fetch raw campaign data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser?.email) return;

    fetch(`http://127.0.0.1:5000/api/campaigns/raw?user=${encodeURIComponent(currentUser.email)}`)
      .then(res => res.json())
      .then(data => {
        setRawData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching raw campaigns:", err);
        setLoading(false);
      });
  }, []);

  // Automatically call prediction when rawData is ready
  useEffect(() => {
    if (!rawData.campaigns || !rawData.campaigns.length) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const campaignsArray = rawData.campaigns;
    const channels = [...new Set(campaignsArray.map(d => d.channel))];

    // For each channel, predict revenue using backend
    const fetchPredictions = async () => {
      const allPredictions = [];

      for (let ch of channels) {
        const channelData = campaignsArray.filter(d => d.channel === ch);
        const totalCustomers = channelData.reduce((sum, d) => sum + d.customers, 0);

        try {
          const response = await fetch("http://127.0.0.1:5000/api/predict/revenue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_email: currentUser.email,
              channel: ch,
              customers: totalCustomers,
              cltv: 0
            })
          });
          const data = await response.json();
          if (!data.error) {
            allPredictions.push({ channel: ch, predictedRevenue: data.predictedRevenue });
          } else {
            console.error(`Prediction error for ${ch}:`, data.error);
          }
        } catch (err) {
          console.error("Prediction error for channel", ch, err);
        }
      }

      setPredictedData(allPredictions);
    };

    fetchPredictions();
  }, [rawData]);

  if (loading) return <p>Loading predictive analytics...</p>;
  if (!rawData.campaigns || !rawData.campaigns.length) return <p>No raw campaign data available.</p>;
  if (!predictedData.length) return <p>Predicting revenue...</p>;

  // Prepare chart data: combine all channels
  const chartData = {
    labels: predictedData[0].predictedRevenue.map((_, i) => `Month ${i + 1}`),
    datasets: predictedData.map((chData, idx) => ({
      label: chData.channel,
      data: chData.predictedRevenue,
      borderColor: `hsl(${idx * 60}, 70%, 50%)`,
      backgroundColor: `hsl(${idx * 60}, 70%, 80%)`,
      fill: false,
      tension: 0.4,
    }))
  };

  return (
    <div className="card p-4 shadow rounded-md bg-white mb-4">
      <h3 className="text-lg font-semibold mb-3">Future Revenue Prediction (AI/ML)</h3>
      <Line data={chartData} />
    </div>
  );
}
