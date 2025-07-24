import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
  IconButton,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useCart, useDispatch } from '../components/CartProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import eventEmitter from "../utils/eventBus"


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: 900,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 6,
  p: { xs: 2, sm: 3, md: 4 },
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function CartModal({ open, handleClose }) {

  const cart = useCart();
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("userId");
  console.log(user_id)
  const token = localStorage.getItem("token");

  const validCoupon = '90323';
  const [couponCode, setCouponCode] = React.useState('');
  const [isApplied, setIsApplied] = React.useState(false);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
    setIsApplied(false);
  };

  const handleApplyCoupon = () => {
    setIsApplied(couponCode === validCoupon);
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleQtyChange = (id, type) => {
    dispatch({ type, payload: id });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);
  const salesTax = totalPrice * 0.1;
  const discountAmount = isApplied ? 70 : 0;
  const grandTotal = totalPrice + salesTax - discountAmount;

  const handleRazorpayOrder = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/razorpayOrder', {
        amount: grandTotal
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        const options = {
          key: "rzp_test_DyMCn5J2LTaem7",
          amount: grandTotal * 100,
          currency: "INR",
          name: "Book Your Pizza",
          description: "Food Order Payment",
          order_id: res.data.order_id,
          handler: async function (paymentResponse) {
            toast.success("Payment Successful");

            // Post to /signVerify with full payment + cart info
            try {
              const signVerifyRes = await axios.post('http://localhost:8080/api/signVerify',
                {
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                  userId: user_id,
                  amount: totalPrice,
                  grandTotal,
                  cartItems: cart.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    total: item.total
                  })),
                  couponApplied: isApplied,
                  couponCode: isApplied ? couponCode : '',
                  discountAmount
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  }
                });

              if (signVerifyRes.status === 200) {
                localStorage.setItem("newOrder", Date.now()); // set a timestamp
                toast.success("Payment Verified & Saved!");
              }

              handleClose();
            } catch (e) {
              toast.error("Payment verified, but saving to DB failed");
              console.error("DB Save Error:", e);
            }
          },
          theme: { color: "#F37254" }
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (e) {
      console.error("Checkout Error:", e);
      toast.error("Payment initiation failed.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight={600} mb={2}>
          Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {cart.length === 0 ? (
          <Typography variant="body1" fontStyle="italic">
            Your cart is empty.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 2 }}>
              {cart.map((item, i) => (
                <Box key={i} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  pb: 2,
                  borderBottom: '1px solid #ccc'
                }}>
                  <Box
                    component="img"
                    src={item.imgs}
                    alt={item.name}
                    onError={(e) => (e.currentTarget.src = '/fallback.png')}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      flexShrink: 0
                    }}
                  />
                  <Box sx={{ minWidth: 100, flexGrow: 1 }}>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button size="small" variant="outlined" onClick={() => handleQtyChange(item.id, 'DECREASE_QTY')}>-</Button>
                    <Typography sx={{ mx: 1 }}>{item.qty}</Typography>
                    <Button size="small" variant="outlined" onClick={() => handleQtyChange(item.id, 'INCREASE_QTY')}>+</Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 80 }}>
                    <Typography>₹{item.total}</Typography>
                    <IconButton onClick={() => handleRemove(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Summary Section */}
            <Box sx={{ flex: 1, borderLeft: { md: '1px solid #ddd' }, pl: { md: 2 }, pt: { xs: 3, md: 0 } }}>
              <Typography fontWeight={600} mb={1}>Price Details</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>₹{totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax (10%):</Typography>
                <Typography>₹{salesTax.toFixed(2)}</Typography>
              </Box>
              {isApplied && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Coupon Discount:</Typography>
                  <Typography color="green">- ₹{discountAmount}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, mb: 2 }}>
                <Typography>Grand Total:</Typography>
                <Typography>₹{grandTotal.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Apply Coupon
              </Typography>
              <Box className='d-flex gap-2'>
                <TextField
                  value={couponCode}
                  onChange={handleCouponChange}
                  name="couponCode"
                  label="Coupon Code"
                  size="small"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: isApplied ? 'green' : undefined },
                      '&:hover fieldset': { borderColor: isApplied ? 'green' : undefined },
                      '&.Mui-focused fieldset': { borderColor: isApplied ? 'green' : undefined },
                    },
                  }}
                />
                <Button variant="outlined" sx={{ mb: 2 }} onClick={handleApplyCoupon}>Apply</Button>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => {
                  if (!token) {
                    toast.error("Please log in to proceed with checkout.");
                    return;
                  }
                  handleRazorpayOrder();
                }}
                disabled={cart.length === 0}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
