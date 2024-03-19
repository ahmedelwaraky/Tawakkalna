
import React, { useState ,useContext } from 'react';
import { Tabs } from 'antd';
import Order from './Order';
import Form from './Form';
import '../assets/css/TapMenu.css'
import { TapProvider , TabContext } from './TapContext';


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

const TapMenu = () =>{
  const { currentTab, setCurrentTab } =  useContext(TabContext);
  const onChange = (key) => {
    setCurrentTab(key)
    console.log(key);
  };
  
return <Tabs defaultActiveKey= {"1"}  activeKey={currentTab} items={items} onChange={onChange}   />;
     
}
export default TapMenu;