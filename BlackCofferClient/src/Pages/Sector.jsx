import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';
import { Box } from '@chakra-ui/react';

const Sector = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter out entries with an empty sector and aggregate the data
  const sectorMap = data.reduce((acc, item) => {
    if (item.sector) {
      if (!acc[item.sector]) {
        acc[item.sector] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.sector].intensity += item.intensity;
      acc[item.sector].likelihood += item.likelihood;
      acc[item.sector].relevance += item.relevance;
      acc[item.sector].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(sectorMap).map(sector => ({
    sector,
    intensity: sectorMap[sector].intensity / sectorMap[sector].count,
    likelihood: sectorMap[sector].likelihood / sectorMap[sector].count,
    relevance: sectorMap[sector].relevance / sectorMap[sector].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.sector),
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
      <ChartComponent data={chartData} type="radar" height={500} width={700} />
    </Box>
  );
};

export { Sector };
