import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Sign from './pages/Sign';
import AuthenticationSuccess from './pages/AuthenticationSuccess';
import AuthWrapper from './components/AuthWrapper';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Sign />} />
        <Route exact path='/auth' element={
          <AuthWrapper>
            <AuthenticationSuccess />
          </AuthWrapper>
        } />
      </Routes>
    </Router>
  );
}

export default App;
