import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const TableSubject = (props) => {
  const downloadReport = () => {
    props.getUserReport();
  };

  const columns = [
    {
      title: 'Предмет',
      dataIndex: 'subjectName',
      key: 'subject',
    },
    {
      title: 'Кредити',
      dataIndex: 'amountCredits',
      key: 'credit',
    },
    {
      title: 'Викладач',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (text) => <a style={{ color: '#271575' }}>{text}</a>,
    },
    // {
    //   title: 'Бал',
    //   key: 'balls',
    //   dataIndex: 'balls',
    //   render: (balls) => (
    //     <>
    //       {balls.map((ball) => {
    //         let color = ball > 90 ? 'green' : 'geekblue';
    //         let name = ball > 90 ? 'відмінно' : 'добре';
    //         if (ball > 61 && ball < 76) {
    //           color = 'orange';
    //           name = 'задовільно';
    //         }
    //         if (ball < 61) {
    //           color = 'volcano';
    //           name = 'незадовільно';
    //         }
    //         return (
    //           <Tag color={color} key={ball}>
    //             <Space>
    //               {ball}
    //               {name}
    //             </Space>
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
  ];

  const data = [
    {
      key: '1',
      teacher: 'Новоселецька С.В.',
      credit: 100,
      subject: 'Англійська мова за професійним спрямуванням',
      balls: [62],
    },
    {
      key: '2',
      teacher: 'Новоселецька С.В.',
      credit: 90,
      subject: 'Дослідження операцій',
      balls: [95],
    },
    {
      key: '3',
      teacher: 'Новоселецька С.В.',
      credit: 120,
      subject: 'Маркетинг',
      balls: [81],
    },
    {
      key: '4',
      teacher: 'Новоселецька С.В.',
      credit: 120,
      subject: 'Прогнозування соціально-економічних процесів',
      balls: [59],
    },
    {
      key: '5',
      teacher: 'Новоселецька С.В.',
      credit: 120,
      subject: 'Проектування та розробка інформаційних систем',
      balls: [100],
    },
  ];

  return (
    <>
      <div className="container-table">
        <Table
          columns={columns}
          dataSource={props.subjects}
          className="table-subject"
          pagination={false}
        />
        <Button
          onClick={downloadReport}
          type="primary"
          icon={<DownloadOutlined />}
          className="btn-download">
          Скачати заліковку
        </Button>
      </div>
    </>
  );
};

export default TableSubject;
