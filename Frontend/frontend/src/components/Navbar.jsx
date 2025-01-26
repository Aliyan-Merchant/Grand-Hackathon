import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', color: 'white', alignItems: 'center' }}>
    <Link to="/"><img src="../../src/assets/logo.png" alt="" /></Link>
    <div>
    <Link to="/" style={{ margin: '0 1rem', color: 'white', border: '2px solid black', background: 'gray', textDecoration: 'none', margin: '30px', padding: '15px', borderRadius: '15px' }}>Home</Link>
      <Link to="/apply-loan" style={{ margin: '0 1rem', color: 'white', border: '2px solid black', background: 'Green', textDecoration: 'none', margin: '30px', padding: '15px', borderRadius: '15px' }}>Apply For Loan</Link>
      <Link to="/login" style={{ margin: '0 1rem', color: 'white', border: '2px solid black', background: 'blue', textDecoration: 'none', margin: '30px', padding: '15px', borderRadius: '15px' }}>SignUp/LogIn</Link>
    </div>
  </nav>
);

export default Navbar;
