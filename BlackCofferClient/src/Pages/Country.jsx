import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';
import { Box } from '@chakra-ui/react';

const Country = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter out entries with an empty country and aggregate the data
  const countryMap = data.reduce((acc, item) => {
    if (item.country) {
      if (!acc[item.country]) {
        acc[item.country] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.country].intensity += item.intensity;
      acc[item.country].likelihood += item.likelihood;
      acc[item.country].relevance += item.relevance;
      acc[item.country].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(countryMap).map(country => ({
    country,
    intensity: countryMap[country].intensity / countryMap[country].count,
    likelihood: countryMap[country].likelihood / countryMap[country].count,
    relevance: countryMap[country].relevance / countryMap[country].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.country),
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
      <ChartComponent data={chartData} type="line" />
    </Box>
  );
};

export { Country };
