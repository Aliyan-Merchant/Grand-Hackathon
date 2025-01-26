import React, { useState } from 'react';

const LoanCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [loanPeriod, setLoanPeriod] = useState(1);

  // Calculate the total loan amount with interest
  const calculateTotalLoan = () => {
    const totalLoan = amount; // Example formula
    return totalLoan.toFixed(2);
  };

  // Calculate the monthly installment
  const calculateMonthlyInstallment = () => {
    const totalMonths = loanPeriod * 12; // Convert years to months
    const totalLoan = parseFloat(calculateTotalLoan());
    const monthlyInstallment = totalLoan / totalMonths;
    return monthlyInstallment.toFixed(2);
  };

  // Format the currency for better readability
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Loan Calculator</h2>
      
      <div>
        <label htmlFor="loanAmount">Loan Amount (PKR):</label>
        <input
          type="number"
          id="loanAmount"
          placeholder="Enter loan amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ margin: '10px 0', padding: '8px', width: '200px' }}
        />
      </div>
      
      <div>
        <label htmlFor="loanPeriod">Loan Period (in Years):</label>
        <select
          id="loanPeriod"
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(Number(e.target.value))}
          style={{ margin: '10px 0', padding: '8px' }}
        >
          <option value={1}>1 Year</option>
          <option value={3}>3 Years</option>
          <option value={5}>5 Years</option>
        </select>
      </div>
      
      <div>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Total Loan: {formatCurrency(calculateTotalLoan())}
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Monthly Installment: {formatCurrency(calculateMonthlyInstallment())}
        </p>
      </div>
    </div>
  );
};

export default LoanCalculator;

