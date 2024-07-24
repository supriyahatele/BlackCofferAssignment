import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';
import { Box } from '@chakra-ui/react';

const Region = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter and aggregate the data
  const regionMap = data.reduce((acc, item) => {
    if (item.region) {
      if (!acc[item.region]) {
        acc[item.region] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.region].intensity += item.intensity;
      acc[item.region].likelihood += item.likelihood;
      acc[item.region].relevance += item.relevance;
      acc[item.region].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(regionMap).map(region => ({
    region,
    intensity: regionMap[region].intensity / regionMap[region].count,
    likelihood: regionMap[region].likelihood / regionMap[region].count,
    relevance: regionMap[region].relevance / regionMap[region].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.region),
    datasets: [
      {
        label: 'Intensity',
        data: aggregatedData.map(item => item.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Likelihood',
        data: aggregatedData.map(item => item.likelihood),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Relevance',
        data: aggregatedData.map(item => item.relevance),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      }
    ]
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <ChartComponent data={chartData} type="bar" />
    </Box>
  );
};

export { Region };
