import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/orderData');
      const json = response.data;
      if (!json.success) throw new Error('Failed to load orders');
      setOrders(json.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 200 },
    { field: 'paymentId', headerName: 'Payment ID', width: 200 },
    { field: 'status', headerName: 'Payment Status', width: 150 },
    { field: 'amount', headerName: 'Amount (₹)', width: 120 },
    { field: 'grandTotal', headerName: 'Grand Total (₹)', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Order Date',
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    orderId: order.orderId,
    paymentId: order.paymentId,
    status: order.status,
    amount: order.amount,
    grandTotal: order.grandTotal,
    createdAt: order.createdAt,
  }));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper sx={{ height: 500, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 12]}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        sx={{
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { 
      margin:0
    }
  }}
      />
    </Paper>
  );
}
