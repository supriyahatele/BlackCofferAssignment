import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';

export const EndYear = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter out entries with an empty end_year and aggregate the data
  const yearMap = data.reduce((acc, item) => {
    if (item.end_year) {
      if (!acc[item.end_year]) {
        acc[item.end_year] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.end_year].intensity += item.intensity;
      acc[item.end_year].likelihood += item.likelihood;
      acc[item.end_year].relevance += item.relevance;
      acc[item.end_year].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(yearMap).map(year => ({
    year,
    intensity: yearMap[year].intensity / yearMap[year].count,
    likelihood: yearMap[year].likelihood / yearMap[year].count,
    relevance: yearMap[year].relevance / yearMap[year].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.year),
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

  return <ChartComponent data={chartData} type="line" />;
};
