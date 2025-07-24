import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import axios from "axios";
import { useEffect, useState } from 'react';

export default function MainGrid() {
  const [orderArr, setOrderArr] = useState([]);
  const [orderTrend, setOrderTrend] = useState('neutral');
  const [orderDays, setOrderDays] = useState([]);
  const [orderPercent, setOrderPercent] = useState(null);

  const [userArr, setUserArr] = useState([]);
  const [userTrend, setUserTrend] = useState('neutral');
  const [userDays, setUserDays] = useState([]);
  const [userPercent, setUserPercent] = useState(null);

  const [revTrend, setRevTrend] = useState('neutral');
  const [revPercent, setRevPercent] = useState(null);

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/orderStats"
        ,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.status === 200) {
        setOrderArr([...response.data.data]);
      }

      const userRes = await axios.get("http://localhost:8080/admin/userStats"
        ,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (userRes.status === 200) {
        setUserArr([...userRes.data.data]);
      }

    } catch (e) {
      console.log("Error in fetching stats", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate order & revenue trend
  useEffect(() => {
    const calculateOrderTrend = (arr) => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(today.getDate() - 14);

      const last7 = arr.filter(order => new Date(order._id) >= sevenDaysAgo);
      const prev7 = arr.filter(order => {
        const date = new Date(order._id);
        return date >= fourteenDaysAgo && date < sevenDaysAgo;
      });

      const sumLast7 = last7.reduce((acc, curr) => acc + curr.orderCount, 0);
      const sumPrev7 = prev7.reduce((acc, curr) => acc + curr.orderCount, 0);

      const revSumLast7 = last7.reduce((acc, curr) => acc + (curr.sales || 0), 0);
      const revSumPrev7 = prev7.reduce((acc, curr) => acc + (curr.sales || 0), 0);

      const trend = sumLast7 > sumPrev7 ? 'up' : sumLast7 < sumPrev7 ? 'down' : 'neutral';
      const percentChange = sumPrev7 === 0 ? 0 : ((sumLast7 - sumPrev7) / sumPrev7) * 100;

      const trendRev = revSumLast7 > revSumPrev7 ? 'up' : revSumLast7 < revSumPrev7 ? 'down' : 'neutral';
      const revPercentChange = revSumPrev7 === 0 ? 0 : ((revSumLast7 - revSumPrev7) / revSumPrev7) * 100;

      setOrderTrend(trend);
      setOrderPercent(percentChange);

      setRevTrend(trendRev);
      setRevPercent(revPercentChange);
    };

    calculateOrderTrend(orderArr);
  }, [orderArr]);

  // Calculate user trend
  useEffect(() => {
    const calculateUserTrend = (arr) => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(today.getDate() - 14);

      const last7 = arr.filter(user => new Date(user._id) >= sevenDaysAgo);
      const prev7 = arr.filter(user => {
        const date = new Date(user._id);
        return date >= fourteenDaysAgo && date < sevenDaysAgo;
      });

      const sumLast7 = last7.reduce((acc, curr) => acc + curr.userCount, 0);
      const sumPrev7 = prev7.reduce((acc, curr) => acc + curr.userCount, 0);

      const trend = sumLast7 > sumPrev7 ? 'up' : sumLast7 < sumPrev7 ? 'down' : 'neutral';
      const percentChange = sumPrev7 === 0 ? 0 : ((sumLast7 - sumPrev7) / sumPrev7) * 100;

      setUserTrend(trend);
      setUserPercent(percentChange);
    };

    calculateUserTrend(userArr);
  }, [userArr]);

  // Generate date labels (shared for orders & revenue)
  useEffect(() => {
    const today = new Date();
    const days = [];

    for (let i = orderArr.length - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
      days.push(label);
    }

    setOrderDays(days);
  }, [orderArr]);

  // Generate date labels for users
  useEffect(() => {
    const today = new Date();
    const days = [];

    for (let i = userArr.length - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
      days.push(label);
    }

    setUserDays(days);
  }, [userArr]);

  // Final card data
  const data = [
    {
      title: 'Total Orders',
      value: orderArr.reduce((sum, order) => sum + order.orderCount, 0).toString(),
      interval: 'Last 30 days',
      trend: orderTrend,
      data: orderArr.map(order => order.orderCount),
      labels: orderDays,
      trendDataPercent: orderPercent?.toFixed(1)
    },
    {
      title: 'Total Users',
      value: userArr.reduce((sum, user) => sum + user.userCount, 0).toString(),
      interval: 'Last 30 days',
      trend: userTrend,
      data: userArr.map(user => user.userCount),
      labels: userDays,
      trendDataPercent: userPercent?.toFixed(1)
    },
    {
      title: 'Total Revenue',
      value: '₹' + orderArr.reduce((sum, curr) => sum + (curr.sales || 0), 0).toLocaleString(),
      interval: 'Last 30 days',
      trend: revTrend,
      data: orderArr.map(rev => rev.sales || 0),
      labels: orderDays,
      trendDataPercent: revPercent?.toFixed(1)
    }
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {data.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <StatCard {...card} />
          </Grid>
        ))}

        {/* <Grid item xs={12} md={6}>
          <SessionsChart />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography> */}

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
