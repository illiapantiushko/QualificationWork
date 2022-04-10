import React, { useState, useEffect } from 'react';
import { addUserGroup } from '../../../Api/actionsAdmin';
import { instance } from '../../../Api/api';
import { connect } from 'react-redux';
import { Modal, Form, Button, Table, Pagination, Layout } from 'antd';

const { Content } = Layout;
const GroupDetails = (props) => {
 

  return (
    <div>
       <Content
      className="site-layout-background"
      style={{
        padding: 30,
        minHeight: 280,
      }}>
      <h1>Group</h1>
    </Content>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    addUserGroup: (data) => {
      dispatch(addUserGroup(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(GroupDetails);
