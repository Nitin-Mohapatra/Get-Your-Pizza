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
import { useCart, useDispatch } from '../components/CartProvider';

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

  const code = '90323'; // Example coupon code
  const [copponCode, setCouponCode] = React.useState();
  const[isApplied, setIsApplied] = React.useState(false);



  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  }

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleQtyChange = (id, type) => {
    dispatch({ type, payload: id });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);
  const salesTax = totalPrice * 0.1;
  const grandTotal = totalPrice + salesTax;

  const isCooponValid = () => {
    if (copponCode === code) {
      return true;
    }return false;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {cart.length === 0 ? (
          <Typography variant="body1" fontStyle="italic">
            Your cart is empty.
          </Typography>
        ) : (
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3
          }}>
            {/* Left side: Cart items */}
            <Box sx={{ flex: 2 }}>
              {cart.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid #ccc'
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={item.imgs}
                    alt={item.name}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      flexShrink: 0
                    }}
                  />

                  {/* Name & Description */}
                  <Box sx={{ minWidth: 100, flexGrow: 1 }}>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>

                  {/* Quantity Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleQtyChange(item.id, 'DECREASE_QTY')}
                    >
                      -
                    </Button>
                    <Typography sx={{ mx: 1 }}>{item.qty}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleQtyChange(item.id, 'INCREASE_QTY')}
                    >
                      +
                    </Button>
                  </Box>

                  {/* Price & Delete */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                      minWidth: 80
                    }}
                  >
                    <Typography>₹{item.total}</Typography>
                    <IconButton onClick={() => handleRemove(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}

            </Box>

            {/* Right side: Summary */}
            <Box sx={{
              flex: 1,
              borderLeft: { md: '1px solid #ddd' },
              pl: { md: 2 },
              pt: { xs: 3, md: 0 }
            }}>
              <Typography fontWeight={600} mb={1}>Price Details</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>₹{totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax (10%):</Typography>
                <Typography>₹{salesTax.toFixed(2)}</Typography>
              </Box>
              { isCooponValid() ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Coupon Discount:</Typography>
                  <Typography color="green">- ₹70</Typography>
                </Box>
              ) : null}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, mb: 2 }}>
                <Typography>Grand Total:</Typography>
                <Typography>₹{grandTotal.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />


              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Apply Coupon    
              </Typography>

              <div className='d-flex  gap-2'> 
                <TextField
                  value={copponCode}
                  onChange={handleCouponChange}
                  name='copponCode'
                  label="Coupon Code"
                  size="small"
                  // fullWidth
                  sx={{ mb: 2 }}
                />
                <Button variant="outlined"  sx={{ mb: 2 }}>Apply</Button>
              </div>

              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
                Checkout
              </Button>
              <Button variant="text" fullWidth onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
