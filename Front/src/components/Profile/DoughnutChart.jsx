import React from 'react';
import { Pie } from 'react-chartjs-2';

import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const DoughnutChart = (props) => {
  const present = props.timeTable.filter((item) => item.isPresent === false).length;
  const absent = props.timeTable.filter((item) => item.isPresent === true).length;

  const data = {
    labels: ['Кількість пропущених пар', 'Кількість відвіданих пар'],
    datasets: [
      {
        type: 'doughnut',
        data: [present, absent],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 2,
      },
    ],
    // options: {
    //   interaction: {
    //     mode: 'index',
    //   },
    // },
  };
  var options = { width: 400, height: 300 };
  return (
    <>
      {/* <Row>
        <Col>
          <Title level={3}>Графік відвідуваності з пердмету Компютені мережі</Title>
          <p>Додаткова інформація</p>
        </Col>
      </Row> */}
      {/* <p>Додаткова інформація </p> */}
      <Pie data={data} options={options} />
    </>
  );
};

export default DoughnutChart;
