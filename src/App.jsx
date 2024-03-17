import React from 'react'
import './App.css';
import 'antd/dist/reset.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './component/Form';
import Button from './component/Button';
import Order from './component/Order';
import Main from './component/Main';
import TopNav from './component/TopNav';
import TapMenu from './component/TapMenu';
import Status from './component/Status';
import LoadingButton from './component/LoadingButton';
import Details from './component/Details';
import Error from './component/Error';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Main/>}/> 
        <Route path="/status"  element={<Status/>}/> 
        <Route path="/form"  element={<Form/>}/> 
        <Route path="/order"  element={<Order/>}/> 
        <Route path="/top"  element={<TopNav/>}/> 
        <Route path="/menu"  element={<TapMenu/>}/> 
        <Route path="/button"  element={<Button/>}/> 
        <Route path="/loadingbutton"  element={<LoadingButton/>}/> 
        <Route path="/details/:id"  element={<Details/>}/> 
        <Route path="/error"  element={<Error/>}/> 
      </Routes>
    </BrowserRouter>
  )
}
