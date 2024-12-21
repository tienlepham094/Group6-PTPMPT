import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/monitor/metrics"
        );
        setMetrics(response.data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!metrics) {
    return <div>No data available</div>;
  }

  const { memoryMetrics, diskMetrics, cpuMetrics, networkTraffic } = metrics;

  // Pie chart data
  const memoryData = [
    { id: "Used Memory", value: memoryMetrics.usedMemoryGB },
    { id: "Available Memory", value: memoryMetrics.availableMemoryGB },
  ];

  const diskData = [
    { id: "Used Disk", value: diskMetrics.usedDiskSpaceGB },
    { id: "Free Disk", value: diskMetrics.freeDiskSpaceGB },
  ];

  const cpuData = [
    { id: "CPU Usage", value: cpuMetrics.cpuUsagePercent },
    { id: "CPU Idle", value: 100 - cpuMetrics.cpuUsagePercent },
  ];

  const networkData = [
    { id: "Data Received", value: networkTraffic.totalBytesReceivedMB },
    { id: "Data Sent", value: networkTraffic.totalBytesSentMB },
  ];

  return (
    <div className="dashboard-container">
      {/* Cards Section */}
      <div className="cards-container">
        <div className="card">
          <h4>Memory</h4>
          <p>Used: {memoryMetrics.usedMemoryGB} GB</p>
          <p>Available: {memoryMetrics.availableMemoryGB} GB</p>
        </div>
        <div className="card">
          <h4>Disk</h4>
          <p>Used: {diskMetrics.usedDiskSpaceGB} GB</p>
          <p>Free: {diskMetrics.freeDiskSpaceGB} GB</p>
        </div>
        <div className="card">
          <h4>CPU</h4>
          <p>Usage: {cpuMetrics.cpuUsagePercent.toFixed(2)}%</p>
          <p>Idle: {(100 - cpuMetrics.cpuUsagePercent).toFixed(2)}%</p>
        </div>
        {/* <div className="card">
          <h4>Network</h4>
          <p>Received: {networkTraffic.totalBytesReceivedMB} MB</p>
          <p>Sent: {networkTraffic.totalBytesSentMB} MB</p>
        </div> */}
      </div>

      {/* Diagrams Section */}
      <div className="diagram-container">
        <h3>Memory Usage</h3>
        <PieChart
          series={[
            {
              data: memoryData,
            },
          ]}
          height={300}
          width={300}
        />

        <h3>Disk Usage</h3>
        <PieChart
          series={[
            {
              data: diskData,
            },
          ]}
          height={300}
          width={300}
        />

        <h3>CPU Usage</h3>
        <PieChart
          series={[
            {
              data: cpuData,
            },
          ]}
          height={300}
          width={300}
        />

        {/* <h3>Network Traffic</h3>
        <PieChart
          series={[
            {
              data: networkData,
            },
          ]}
          height={300}
          width={300}
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
