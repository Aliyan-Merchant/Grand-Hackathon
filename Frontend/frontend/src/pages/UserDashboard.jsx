import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './UserDashboard.css'; // Import external CSS file

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loanConfirmed, setLoanConfirmed] = useState(false);  // Track loan confirmation
  
  // Redux state selectors
  const user = useSelector((state) => state.auth.user);
  const loanRequests = useSelector((state) => state.loans.userLoanRequests);
  const dispatch = useDispatch(); // To dispatch actions
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleConfirmLoan = () => {
    // You can dispatch an action to confirm the loan here
    // Example: dispatch(confirmLoan(selectedCategory, selectedSubcategory));

    // For now, we'll simulate the confirmation process
    setLoanConfirmed(true);
    alert("Loan request confirmed!");
    
    // Redirect to /loanform after confirmation
    navigate('/loanform');
  };

  return (
    <div className="user-dashboard">
      <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
      <form className="loan-form">
        {/* Main Category Dropdown */}
        <label htmlFor="main-category" className="dropdown-label">Select Loan Category</label>
        <select id="main-category" onChange={handleCategoryChange} className="dropdown">
          <option value="">-- Select --</option>
          <option value="wedding-loans">Wedding Loans</option>
          <option value="home-construction-loans">Home Construction Loans</option>
          <option value="business-startup-loans">Business Startup Loans</option>
          <option value="education-loans">Education Loans</option>
        </select>

        {/* Conditionally Render Subcategories */}
        {selectedCategory === "wedding-loans" && (
          <>
            <label htmlFor="wedding-loans" className="dropdown-label">Wedding Loans Subcategory</label>
            <select id="wedding-loans" onChange={handleSubcategoryChange} className="dropdown">
              <option value="valima">Valima</option>
              <option value="furniture">Furniture</option>
              <option value="valima-food">Valima Food</option>
              <option value="jahez">Jahez</option>
            </select>
            <p className="loan-details">Maximum loan: PKR 5 Lakh</p>
            <p className="loan-details">Loan period: 3 years</p>
          </>
        )}

        {selectedCategory === "home-construction-loans" && (
          <>
            <label htmlFor="home-construction-loans" className="dropdown-label">Home Construction Loans Subcategory</label>
            <select id="home-construction-loans" onChange={handleSubcategoryChange} className="dropdown">
              <option value="structure">Structure</option>
              <option value="finishing">Finishing</option>
              <option value="loan">Loan</option>
            </select>
            <p className="loan-details">Maximum loan: PKR 10 Lakh</p>
            <p className="loan-details">Loan period: 5 years</p>
          </>
        )}

        {selectedCategory === "business-startup-loans" && (
          <>
            <label htmlFor="business-startup-loans" className="dropdown-label">Business Startup Loans Subcategory</label>
            <select id="business-startup-loans" onChange={handleSubcategoryChange} className="dropdown">
              <option value="buy-stall">Buy Stall</option>
              <option value="advance-rent">Advance Rent for Shop</option>
              <option value="shop-assets">Shop Assets</option>
              <option value="shop-machinery">Shop Machinery</option>
            </select>
            <p className="loan-details">Maximum loan: PKR 10 Lakh</p>
            <p className="loan-details">Loan period: 5 years</p>
          </>
        )}

        {selectedCategory === "education-loans" && (
          <>
            <label htmlFor="education-loans" className="dropdown-label">Education Loans Subcategory</label>
            <select id="education-loans" onChange={handleSubcategoryChange} className="dropdown">
              <option value="university-fees">University Fees</option>
              <option value="child-fees-loan">Child Fees Loan</option>
            </select>
            <p className="loan-details">Maximum loan: Based on requirement</p>
            <p className="loan-details">Loan period: 4 years</p>
          </>
        )}
      </form>

      {/* Display selected category */}
      {selectedCategory && <p className="selected-category">Selected Category: {selectedCategory}</p>}

      {/* Display loan confirmation */}
      {selectedSubcategory && !loanConfirmed && (
        <div className="confirm-loan">
          <p className="confirm-message">You have selected the subcategory: {selectedSubcategory}</p>
          <button onClick={handleConfirmLoan} className="confirm-button">Confirm Loan</button>
        </div>
      )}

      {loanConfirmed && (
        <p className="loan-confirmed">Your loan has been confirmed! Redirecting...</p>
      )}

      {/* Display loan requests */}
      {loanRequests.length > 0 ? (
        <ul className="loan-requests-list">
          {loanRequests.map((loan, index) => (
            <li key={index} className="loan-request-item">
              <p className="loan-category">Category: {loan.category}</p>
              <p className="loan-status">Status: {loan.status}</p>
              <p className="loan-amount">Amount: PKR {loan.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-loans">No loan requests yet.</p>
      )}
    </div>
  );
};

export default UserDashboard;
