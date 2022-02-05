import * as React from 'react';
import { Row, Col, Card, List, Divider } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ProfileInfo = (props) => {
  const profile = props.profile;

  return (
    <Row>
      <Col xs={24}>
        <Card bordered={false} className="profile-details">
          <Row>
            <Col sm={14} md={16} xl={20} style={{ padding: '10px 20px' }}>
              <div className="user-details">
                <div className="m-b-40">
                  <Avatar size={64} src={profile?.profilePicture} />
                </div>
                <span className="floating-icon">{/* <Icon type="star" /> */}</span>
                <div className="work-experience">
                  <h2 className="after-underline">{profile?.userName}</h2>
                  <div className="m-b-10 m-t-15">
                    <h4>Email:</h4>
                    <span>{profile?.email}</span>
                  </div>
                  <div className="m-b-10 m-t-15">
                    <h4>Position:</h4>
                    <span>{!profile?.isContract ? 'Контрактник' : 'Державник'}</span>
                  </div>
                </div>

                <div className="m-t-25">
                  {/* <h2 className="after-underline">Groups</h2> */}

                  <Divider orientation="left">Groups</Divider>

                  <List
                    bordered
                    dataSource={profile?.userGroups}
                    renderItem={(item) => (
                      <List.Item className="skill-item">{item.group.groupName}</List.Item>
                    )}
                  />
                </div>
                <div className="m-t-25">
                  <Divider orientation="left">Roles</Divider>
                  {/* <h2 className="after-underline">Roles</h2> */}
                  <List
                    bordered
                    dataSource={profile?.userRoles}
                    renderItem={(item) => (
                      <List.Item className="skill-item">{item.role.name}</List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileInfo;
