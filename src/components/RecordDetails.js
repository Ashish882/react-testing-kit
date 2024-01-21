import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, CircularProgress } from '@mui/material';
import api from '../services/api';
import { useParams } from 'react-router-dom';

const RecordDetails = () => {
  const [record, setRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); // Extract the 'id' parameter from the route

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const fetchedRecord = await api.getRecord(id);
        setRecord(fetchedRecord);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching record:', error);
        setError('Error fetching record. Please try again.');
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedRecord = await api.updateRecord(id, {
        firstName: editedFirstName,
        lastName: editedLastName,
        phone: editedPhone,
      });
      setRecord(updatedRecord);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating record:', error);
      setError('Error updating record. Please try again.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h4">Record Details</Typography>
      <div style={{ padding: '20px' }}>
        <Typography>First Name: {record.firstName}</Typography>
        <Typography>Last Name: {record.lastName}</Typography>
        <Typography>Phone: {record.phone}</Typography>
      </div>
      {isEditing ? (
        <div style={{ padding: '20px' }}>
          <TextField
            label="Edited First Name"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
            required
          />
          <TextField
            label="Edited Last Name"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
            required
          />
          <TextField
            label="Edited Phone"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
            required
          />
          <Button style={{ padding: '10px' }} variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default RecordDetails;