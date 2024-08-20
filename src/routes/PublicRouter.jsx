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
        <Route path="/login" element={user ? <Navigate to="/app" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/app" replace /> : <Register />} />
        <Route path="*" element={<Navigate to={user ? "/app" : "/login"} replace />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRouter;
