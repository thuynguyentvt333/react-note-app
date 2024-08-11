import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound';
import Layout from '../layouts/Layout';
import TaskPage from '../pages/TaskPage/TaskPage';
import NotePage from '../pages/NotePage/NotePage';

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/notes" element={<NotePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
