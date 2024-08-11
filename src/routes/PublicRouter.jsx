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
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/notes" element={<NotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default PublicRouter;