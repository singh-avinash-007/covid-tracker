import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const [dailyData, setDailyData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, [setDailyData]);
  const lineChart =
    dailyData.length > 0 ? (
      <Line
        data={{
          labels: dailyData.map((data) => data.date),
          label: "Infected",
          borderColor: "#3333ff",
          fill: true,
          datasets: [
            {
              data: dailyData.map((data) => data.confirmed),
              label: "Recovered",
              borderColor: "green",
              backgroundColor: "rgba(0,255,0, 0.5)",
              fill: true,
            },
            {
              data: dailyData.map((data) => data.deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
