import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRouter from './routes/PublicRouter';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/*" element={<PublicRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
