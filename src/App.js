import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './components/Form';
import DataTable from './components/DataTable';
import RecordDetails from './components/RecordDetails';
import api from './services/api';
import './App.css'; // Import your CSS file

const App = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {

    setLoading(true);
    try {
      await api.submitForm(formData);
      alert("Record added successfully");
    } catch (error) {
      setError('Error submitting form:', error.message)
      console.error('Error submitting form:', error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div style={{ padding: '20px', margin: '20px' }}>
        <nav>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/records">Records</Link>
            </li>
          </ul>
        </nav>

        
        {loading && <p>Loading...</p>}
        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={<Form onSubmit={handleFormSubmit} />}
          />
          <Route
            path="/records"
            element={<DataTable/>}
          />
          <Route
            path="/record-details/:id"
            element={<RecordDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;