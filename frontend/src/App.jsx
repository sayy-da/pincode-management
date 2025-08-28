// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { UserLogin } from './pages/userLogin';
import { UserRegister } from './pages/UserRegister';
import { UserHome } from './pages/UserHome';
import { AdminDashboard } from './pages/AdminDashboard';
import { useSelector } from 'react-redux';
const App = () => {

  const {auth,role} = useSelector((state) => state.user)
  const Authenticated = ({element})=>{
    if(!auth){
      return <Navigate to="/login" />;
    }
    return element
  }
  const Unauth = ({element}) =>{
    if (auth && role=='user'){
     return <Navigate to='/'/>    }
    if (auth && role=='admin'){
     return <Navigate to='/admin/dashboard' />
    }
    return element
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Unauth element={<UserLogin/> }  />} />
        <Route path="/register" element={<Unauth element={<UserRegister />}  />} />
        <Route path="/" element={<Authenticated element={<UserHome />} />}/>
        <Route path="/admin/dashboard" element={<Authenticated  element={<AdminDashboard/> } />} />
      </Routes>
    </Router>
  );
};

export default App;
