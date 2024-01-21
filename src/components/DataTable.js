import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../services/api';

const DataTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const newRecords = await api.fetchRecords();
        setRecords(newRecords);
      } catch (error) {
        console.error('Error fetching records:', error);
        setError('Error fetching records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 320 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    {
      field: 'details',
      headerName: 'Details',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          component={RouterLink}
          to={`/record-details/${params.row.id}`}
        >
          View
        </Button>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!records || records.length === 0) {
    return <div>No records found.</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={records} columns={columns} pageSize={5} />
    </div>
  );
};

export default DataTable;