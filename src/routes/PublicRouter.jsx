import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import { AuthContext } from '../contexts/AuthContext';
import PublicLayout from '../layouts/PublicLayout';

const PublicRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <PublicLayout>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/app/home" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/app/home" /> : <Register />} />
        <Route path="*" element={<Navigate to={user ? "/app/home" : "/login"} />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRouter;
