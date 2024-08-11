import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import PrivateLayout from '../layouts/PrivateLayout';
import TaskPage from '../pages/TaskPage/TaskPage';
import NotePage from '../pages/NotePage/NotePage';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRouter = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <PrivateLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/notes" element={<NotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PrivateLayout>
  );
};

export default PrivateRouter;
