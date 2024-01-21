import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const Form = ({ onSubmit }) => {
  
  const [formData, setFormData] = useState({
    // Your form fields here
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Add Record</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        type="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default Form;