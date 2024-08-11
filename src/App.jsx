import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRouter from './routes/PublicRouter';
import PrivateRouter from './routes/PrivateRouter';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/app/*" element={<PrivateRouter />} />
          <Route path="/*" element={<PublicRouter />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
