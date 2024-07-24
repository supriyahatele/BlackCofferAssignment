import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';
import { Box } from '@chakra-ui/react';

const City = () => {
  const { data, loading, error } = useContext(dataContext);

  const cityMap = data.reduce((acc, item) => {
    if (item.city) {
      if (!acc[item.city]) {
        acc[item.city] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.city].intensity += item.intensity;
      acc[item.city].likelihood += item.likelihood;
      acc[item.city].relevance += item.relevance;
      acc[item.city].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(cityMap).map(city => ({
    city,
    intensity: cityMap[city].intensity / cityMap[city].count,
    likelihood: cityMap[city].likelihood / cityMap[city].count,
    relevance: cityMap[city].relevance / cityMap[city].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.city),
    datasets: [
      {
        label: 'City Data',
        data: aggregatedData.map(item => item.intensity),
        backgroundColor: aggregatedData.map(
          (_, idx) =>
            `rgba(${(idx * 20) % 255}, ${(idx * 40) % 255}, ${(idx * 60) % 255}, 0.6)`
        ),
      }
    ]
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <Box>
      <ChartComponent data={chartData} type="pie" />
    </Box>
  );
};

export { City };
