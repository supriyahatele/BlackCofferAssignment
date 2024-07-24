import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';
import { Box } from '@chakra-ui/react';

const Source = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter and aggregate the data
  const sourceMap = data.reduce((acc, item) => {
    if (item.source) {
      if (!acc[item.source]) {
        acc[item.source] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.source].intensity += item.intensity;
      acc[item.source].likelihood += item.likelihood;
      acc[item.source].relevance += item.relevance;
      acc[item.source].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(sourceMap).map(source => ({
    source,
    intensity: sourceMap[source].intensity / sourceMap[source].count,
    likelihood: sourceMap[source].likelihood / sourceMap[source].count,
    relevance: sourceMap[source].relevance / sourceMap[source].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.source),
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
  if (error) return <div>Something went wrong</div>;

  return (
    <Box>
      <ChartComponent data={chartData} type="line" />
    </Box>
  );
};

export { Source };
