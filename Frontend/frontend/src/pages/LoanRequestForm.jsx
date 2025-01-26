import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection

const LoanRequestForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    email: '',
    guarantorName: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validate CNIC format (13 digits)
  const validateCNIC = (cnic) => {
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/; // Format: XXXXX-XXXXXXX-X
    return cnicPattern.test(cnic);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.cnic) formErrors.cnic = 'CNIC is required';
    else if (!validateCNIC(formData.cnic)) formErrors.cnic = 'CNIC is invalid. Format: XXXXX-XXXXXXX-X';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.guarantorName) formErrors.guarantorName = 'Guarantor Name is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If form is valid, redirect to /yourloans
      console.log("Loan Request Submitted:", formData);
      navigate('/yourloans'); // Redirect to /yourloans page
    } else {
      console.log('Form contains errors');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loan-request-form">
      <h2>Loan Request</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        type="text" // Changed to text to allow hyphens
        name="cnic"
        placeholder="CNIC (XXXXX-XXXXXXX-X)"
        value={formData.cnic}
        onChange={handleChange}
        required
      />
      {errors.cnic && <p className="error">{errors.cnic}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="text"
        name="guarantorName"
        placeholder="Guarantor Name"
        value={formData.guarantorName}
        onChange={handleChange}
        required
      />
      {errors.guarantorName && <p className="error">{errors.guarantorName}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanRequestForm;
