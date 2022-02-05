import React from "react";
import { Card, Dropdown, Menu, Button } from "antd";
const SubjectDone = () => {
  const gridStyle = {
    width: "32%",
    margin: 4,
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Додати в архів
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Card.Grid className="card-grid card-grid-done" style={gridStyle}>
      <div>
        <div className="card-header_wraper">
          <h4 className="card-header">Англійська мова</h4>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button type="link">
              <i class="fas fa-bell"></i>
            </Button>
          </Dropdown>
        </div>
        <div className="card-content">
          <div>
            <span className="card-text">Новоселецька С.В.</span>
          </div>
          <a href="#" className="card-text">
            sofiia.prusik@oa.edu.ua
          </a>
        </div>
        <div className="card-footer">
          <div className="card-footer__inner">
            <span className="item date-done">
              20.06.22
              <i class="fal fa-check-double"></i>
            </span>
            <span className="item subject-done">20/22</span>
          </div>
        </div>
      </div>
    </Card.Grid>
  );
};

export default SubjectDone;
