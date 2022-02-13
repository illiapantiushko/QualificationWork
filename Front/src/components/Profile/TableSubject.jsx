import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const TableSubject = ({ getUserReport, subjects, isFetching }) => {
  const downloadReport = () => {
    getUserReport();
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
      render: (text, record) => <span style={{ color: '#271575' }}>{record.teacher} </span>,
    },
    {
      title: 'Бал',
      key: 'balls',
      dataIndex: 'balls',
      render: (text, record) => (
        <>
          {[record.timeTables.reduce((n, { score }) => n + score, 0)].map((ball) => {
            let color = ball > 90 ? 'green' : 'geekblue';
            let name = ball > 90 ? 'відмінно' : 'добре';
            if (ball > 61 && ball < 76) {
              color = 'orange';
              name = 'задовільно';
            }
            if (ball < 61) {
              color = 'volcano';
              name = 'незадовільно';
            }
            return (
              <Tag color={color} key={ball}>
                <Space>
                  {ball}
                  {name}
                </Space>
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="container-table">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={subjects}
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
