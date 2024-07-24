import React, { useContext } from 'react';
import { dataContext } from '../context/DataContextProvider';
import { ChartComponent } from '../components/ChartComponent';

const Topics = () => {
  const { data, loading, error } = useContext(dataContext);

  // Filter and aggregate the data
  const topicMap = data.reduce((acc, item) => {
    if (item.topic) {
      if (!acc[item.topic]) {
        acc[item.topic] = {
          intensity: 0,
          likelihood: 0,
          relevance: 0,
          count: 0
        };
      }
      acc[item.topic].intensity += item.intensity;
      acc[item.topic].likelihood += item.likelihood;
      acc[item.topic].relevance += item.relevance;
      acc[item.topic].count += 1;
    }
    return acc;
  }, {});

  const aggregatedData = Object.keys(topicMap).map(topic => ({
    topic,
    intensity: topicMap[topic].intensity / topicMap[topic].count,
    likelihood: topicMap[topic].likelihood / topicMap[topic].count,
    relevance: topicMap[topic].relevance / topicMap[topic].count
  }));

  const chartData = {
    labels: aggregatedData.map(item => item.topic),
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

  return <ChartComponent data={chartData} type="bar" />;
};

export { Topics };
