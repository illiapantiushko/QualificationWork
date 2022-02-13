import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

const CardSubject = ({ data, profile }) => {
  const gridStyle = {
    width: '32%',
    margin: 4,
  };

  return (
    <Card.Grid className="card-grid" style={gridStyle}>
      <div>
        <div className="card-header_wraper">
          <h4 className="card-header">{data.subjectName}</h4>
          <Link to={`/subjectDetails/${data.id}`}>
            <Button className="card-btn">Переглянути</Button>
          </Link>
        </div>
        <div className="card-content">
          <div>
            <span className="card-text">{data.teacher}</span>
          </div>
          <a className="card-text">{profile?.email}</a>
        </div>
        <div className="card-footer">
          <div className="card-footer__inner">
            <span className="item date">
              {new Date(data.subjectСlosingDate).toLocaleString('uk-UA')}
              <i class="fal fa-check"></i>
            </span>
            <span className="item">
              20/
              <span className="subject-done">22</span>
            </span>
          </div>
        </div>
      </div>
    </Card.Grid>
  );
};

export default CardSubject;
