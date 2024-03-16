
import React from 'react';
import { Tabs } from 'antd';
import Order from './Order';
import Form from './Form';
import '../assets/css/TapMenu.css'
const onChange = (key) => {

  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'الطلبات السابقة',
    children: <Order/>,
  },

  {
    key: '2',
    label: 'طلب جديد',
    children: <Form/>,
  },


];

const TapMenu = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange}   />;
export default TapMenu;