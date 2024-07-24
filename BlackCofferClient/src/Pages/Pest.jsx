import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';
import { Box } from '@chakra-ui/react';

const Pest = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter out entries with an empty pest and aggregate the data
  const pestMap = data.reduce((acc, item) => {
    if (item.pestle) {
      if (!acc[item.pestle]) {
        acc[item.pestle] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.pestle].intensity += item.intensity;
      acc[item.pestle].likelihood += item.likelihood;
      acc[item.pestle].relevance += item.relevance;
      acc[item.pestle].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(pestMap).map(pest => ({
    pest,
    intensity: pestMap[pest].intensity / pestMap[pest].count,
    likelihood: pestMap[pest].likelihood / pestMap[pest].count,
    relevance: pestMap[pest].relevance / pestMap[pest].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.pest),
    datasets: [
      {
        label: 'Intensity',
        data: aggregatedData.map(item => item.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Likelihood',
        data: aggregatedData.map(item => item.likelihood),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      },
      {
        label: 'Relevance',
        data: aggregatedData.map(item => item.relevance),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <Box>
      <ChartComponent data={chartData} type="radar" />
    </Box>
  );
};

export { Pest };
