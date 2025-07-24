import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export default function CardAlert() {
  return (
    <Card
      variant="outlined"
      sx={{
        m: 1.5,
        flexShrink: 0,
        backgroundColor: '#f3faff',
        borderLeft: '4px solid #1976d2',
        boxShadow: 1,
      }}
    >
      <CardContent>
        <Typography
          display="flex"
          alignItems="center"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#0d47a1' }}
        >
          <AutoAwesomeRoundedIcon
            fontSize="small"
            sx={{ mr: 1, color: '#1976d2' }}
          />
          Heads up, Captain!
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Your plan's on its final stretch. Extend it now and keep the dashboard magic alive. 🚀
        </Typography>
      </CardContent>
    </Card>
  );
}
