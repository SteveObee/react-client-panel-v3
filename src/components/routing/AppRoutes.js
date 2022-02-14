import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../auth/Login";
import Register from "../auth/Register";
import ClientDetails from "../clients/ClientDetails";
import EditClient from "../clients/EditClient";
import AddClient from "../clients/AddClient";
import Settings from "../settings/Settings";
import NotFound from "../layout/NotFound";
import Dashboard from "../layout/Dashboard";
import RequireAuth from './RequireAuth';
import Logout from '../auth/Logout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/" element={
        <RequireAuth component={Dashboard} />     
      } />
      <Route exact path="/client/:id" element={
        <RequireAuth component={ClientDetails} />     
      } />
      <Route exact path="/client/edit/:id" element={
        <RequireAuth component={EditClient} />     
      } />
      <Route exact path="/client/add" element={
        <RequireAuth component={AddClient} />     
      } />
      <Route exact path="/settings" element={
        <RequireAuth component={Settings} />     
      } />
      <Route exact path="/logout" element={
        <RequireAuth component={Logout} />     
      } />
      <Route path="*" element={<NotFound/>} />            
    </Routes>
  );
};

export default AppRoutes;
