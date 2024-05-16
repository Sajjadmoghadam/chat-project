import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginRegister from './Pages/Login/Index';

const App = () => {
  return (
    <>
    <Routes>
      {/* <Route path="/"  element={<Home />} /> */}
      <Route path="/login-register" exact element={<LoginRegister />} />
    </Routes>
    </>
  );
}

export default App;
