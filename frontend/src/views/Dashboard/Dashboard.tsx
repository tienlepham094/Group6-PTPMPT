import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import userresourceApi from "../../api/userresource";
import { useAuth } from "../../context/useAuth";
import { Resources } from "../../types";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

const Dashboard = () => {
  const [metrics, setMetrics] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [userResource, setUserResources] = useState<Resources[]>([]);

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
  }, []); // Empty dependency array to run the fetchMetrics only once when the component mounts.

  useEffect(() => {
    const fetchUserResources = async () => {
      try {
        const res = await userresourceApi.getAllUserResources({
          userId: user.id,
        });
        setUserResources(res);
        console.log(res);
      } catch (error) {
        console.error("Failed to fetch user resources:", error);
      }
    };

    if (user.id) {
      fetchUserResources();
    }
  }, [user.id]); // Run this effect when the user.id changes.

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Memory</Typography>
              <Typography>Used: {memoryMetrics.usedMemoryGB} GB</Typography>
              <Typography>
                Available: {memoryMetrics.availableMemoryGB} GB
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Disk</Typography>
              <Typography>Used: {diskMetrics.usedDiskSpaceGB} GB</Typography>
              <Typography>Free: {diskMetrics.freeDiskSpaceGB} GB</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">CPU</Typography>
              <Typography>
                Usage: {cpuMetrics.cpuUsagePercent.toFixed(2)}%
              </Typography>
              <Typography>
                Idle: {(100 - cpuMetrics.cpuUsagePercent).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Charts Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tài nguyên máy tính
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Memory Usage</Typography>
            <PieChart
              series={[{ data: memoryData }]}
              height={300}
              width={300}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Disk Usage</Typography>
            <PieChart series={[{ data: diskData }]} height={300} width={300} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">CPU Usage</Typography>
            <PieChart series={[{ data: cpuData }]} height={300} width={300} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Network Traffic</Typography>
            <PieChart
              series={[{ data: networkData }]}
              height={300}
              width={300}
            />
          </Grid>
        </Grid>
      </Box>

      {/* User Resources Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tài nguyên được cấp phát
        </Typography>

        <Grid container spacing={3}>
          {userResource.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <Card>
                <CardContent>
                  {resource.resourceType && (
                    <Typography>
                      Loại tài nguyên: {resource.resourceType}
                    </Typography>
                  )}
                  {resource.quantity && (
                    <Typography>Số lượng: {resource.quantity}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
