import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const api = {
  fetchRecords: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/candidates`);
      return response.data.candidates;
      
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },

  submitForm: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/candidates`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  },

  getRecord: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/candidates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching record:', error);
      throw error;
    }
  },

  updateRecord: async (id, formData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/candidates/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  },
};

export default api;
