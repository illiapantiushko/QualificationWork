import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Col, Row, Typography, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const LineChart = () => {
  const labels = [65, 59, 80, 81, 56, 55, 40];

  const [type, setType] = useState('line');

  const data = {
    labels: labels,
    datasets: [
      {
        type: type,
        label: 'Test Chart',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#64ea91',
        borderColor: '#64ea91',
      },
      {
        type: type,
        label: 'Test Chart2',
        data: [70, 60, 90, 50, 60, 70, 50],
        fill: false,
        backgroundColor: '#f69899',
        borderColor: '#f69899',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row>
        <Col>
          <Title level={3}>Графік відвідуваності з пердмету Компютені мережі</Title>
          <p>Додаткова інформація </p>
        </Col>
      </Row>
      <Select placeholder="line" onChange={(e) => setType(e)}>
        <Option value="line">Line</Option>
        <Option value="bar">Bar</Option>
        <Option value="doughnut">Doughnut</Option>
      </Select>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
