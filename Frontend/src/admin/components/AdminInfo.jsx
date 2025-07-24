// AdminInfo.jsx
import React from 'react';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';

const AdminInfo = ({ compact = false }) => {
  const navigate = useNavigate();

  const name = localStorage.getItem('adminName') || 'Admin';
  const email = localStorage.getItem('adminEmail') || 'admin@example.com';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: compact ? 1 : 2,
        borderTop: compact ? 'none' : '1px solid',
        borderColor: compact ? 'transparent' : 'divider',
        width: '100%',
      }}
    >
      <Avatar alt={name} sx={{ width: compact ? 32 : 40, height: compact ? 32 : 40 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight={600} noWrap>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {email}
        </Typography>
      </Box>

      <Button
        onClick={handleLogout}
        variant={compact ? 'text' : 'outlined'}
        size="small"
        startIcon={<LogoutRoundedIcon />}
        sx={{ minWidth: compact ? 0 : 'auto' }}
      >
        {!compact && 'Logout'}
      </Button>
    </Stack>
  );
};

export default AdminInfo;
