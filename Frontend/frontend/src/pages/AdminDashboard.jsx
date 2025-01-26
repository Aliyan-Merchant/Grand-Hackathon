import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setApplications, updateApplicationStatus } from '../features/admin/adminSlice.jsx';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.admin.applications);

  // Mock API call to fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      const mockData = [
        { id: 1, name: "John Doe", category: "Business Startup", status: "Pending", amount: 500000 },
        { id: 2, name: "Jane Doe", category: "Education", status: "Approved", amount: 200000 },
      ];
      dispatch(setApplications(mockData));
    };
    fetchApplications();
  }, [dispatch]);

  const handleApproval = (id) => {
    dispatch(updateApplicationStatus({ id, status: "Approved" }));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Applications</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <p>Name: {app.name}</p>
            <p>Category: {app.category}</p>
            <p>Status: {app.status}</p>
            <p>Amount: PKR {app.amount}</p>
            {app.status === "Pending" && (
              <button onClick={() => handleApproval(app.id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
