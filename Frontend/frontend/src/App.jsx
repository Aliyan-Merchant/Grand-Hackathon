import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Register from './pages/Register.jsx';
import Auth from './pages/Auth.jsx';
import LoanRequestForm from './pages/LoanRequestForm.jsx';
import LoanCalculator from './pages/LoanCalculator.jsx'

const App = () => (
  <Router>
    <Navbar />
    <hr />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/apply-loan" element={<UserDashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/loanform" element={<LoanRequestForm />} />
      <Route path='/yourloans' element={<LoanCalculator />} />
      </Routes>
    <Footer />
  </Router>
);

export default App;
