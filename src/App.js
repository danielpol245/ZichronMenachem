import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Redirect, BrowserRouter} from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ParentDashboard from './pages/ParentDashboard';
import MedicalStaffDashboard from './pages/MedicalStaffDashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {userRole === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
        {userRole === 'parent' && (
          <Route path="/parent" element={<ParentDashboard />} />
        )}
        {userRole === 'medicalStaff' && (
          <Route path="/medical-staff" element={<MedicalStaffDashboard />} />
        )}
        <Route path='/Register' element={<RegisterForm />}/>  
        <Route path='/Login' element={<LoginForm />}/>  
      </Routes>
    </Router>
  );
}


export default App;

      
