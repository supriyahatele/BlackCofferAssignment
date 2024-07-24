import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar, PolarArea, Bubble, Scatter } from 'react-chartjs-2';
import { Box, Flex } from '@chakra-ui/react';

// Register components
ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const ChartComponent = ({ data, type, height = 500, width = 1000 }) => {
  const chartTypes = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
    radar: Radar
  };

  const Chart = chartTypes[type] || Line;

  return (
    <Flex justify="center" align="center" height="100vh" p={4}>
      <Box height="100%" width="100%" maxWidth={`${width}px`} maxHeight={`${height}px`}>
        <Chart
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          }}
        />
      </Box>
    </Flex>
  );
};

export { ChartComponent };
