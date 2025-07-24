import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function OrderStatsBarChart() {
  const theme = useTheme();
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [nonVegItemCount, setNonVegItemCount] = useState(0);
  const [cheeseBurstItemCount, setCheeseBurstItemCount] = useState(0);
  const [vegItemCount, setVegItemCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/menuItemStats",
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (response.status === 200) {
          setTotalItemCount(response.data.totalMenuItem);
          setNonVegItemCount(response.data.nonVegItemCount);
          setCheeseBurstItemCount(response.data.cheeseBurstItemCount);
          setVegItemCount(response.data.vegItemCount);
        }
      } catch (e) {
        console.log('Error in fetching data', e);
      }
    };

    fetchData();
  }, []);

  //to change bar graph colour
  const colorPalette = [
    (theme.vars || theme).palette.success.dark,
    (theme.vars || theme).palette.success.main,
    (theme.vars || theme).palette.success.light,
  ];

  const orderData = {
    days: ['Non-Veg', 'Cheese Burst', 'Veg'],
    orders: [nonVegItemCount, cheeseBurstItemCount, vegItemCount],
  };

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Menu Items
        </Typography>

        <Stack sx={{ justifyContent: 'space-between', mb: 1 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="p">
              {totalItemCount}
            </Typography>
            {/* <Chip size="small" color="success" label="+12%" /> */}
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Item Count Breakdown
          </Typography>
        </Stack>

        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: orderData.days,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'orders',
              label: 'Item Category',
              data: orderData.orders,
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend
          slotProps={{
            tooltip: {
              sx: {
                '& .MuiChartsTooltip-tooltip': {
                  color: 'white', // Text color
                  backgroundColor: theme.palette.success.main, // Background color
                  borderRadius: '6px',
                  fontWeight: 'bold',
                },
              },
            },
          }}
        />

      </CardContent>
    </Card>
  );
}
