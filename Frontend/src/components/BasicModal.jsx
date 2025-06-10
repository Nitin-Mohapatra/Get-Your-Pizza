import * as React from 'react';
import {
  Box, Button, Typography, Modal, Rating
} from '@mui/material';
import axios from 'axios';
import { toast} from 'react-toastify';
import { useCart, useDispatch } from './CartProvider';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 6,
  p: 4,
};

export default function BasicModal({ openModal, handleClose, foodData }) {
  const [price, setPrice] = React.useState(foodData.price);
  const [qty, setQty] = React.useState(1);
  const [allReviews, setAllReviews] = React.useState([]);
  const [reviewForm, setReviewForm] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const dispatch = useDispatch();

  const addToCart = (foodData) => {
    const data = {
      id: foodData._id,
      name: foodData.name,
      price: foodData.price,
      qty: qty,
      total: foodData.price * qty,
      imgs: foodData.image_url,
      description: foodData.description,
    };
    dispatch({ type: "ADD_TO_CART", payload: data });
    toast.success("Item added to cart!");
  };

  const user_id = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const handlePriceChange = (e) => {
    const selectedQty = parseInt(e.target.value, 10);
    setQty(selectedQty);
    setPrice(foodData.price * selectedQty);
  };

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/showReview");
        if (response.status === 200) {
          setAllReviews(response.data.allReviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    if (openModal) {
      setPrice(foodData.price);
      setQty(1);
      fetchReviews();
    } else {
      setAllReviews([]);
    }
  }, [openModal]);

  const makeReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/createReview",
        {
          review: reviewForm,
          user_id,
          rating,
          item_id: foodData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Review submitted!");
        setAllReviews((prev) => [...prev, { review: reviewForm, rating, item_id: foodData._id }]);
        setReviewForm("");
        setRating(0);
        toast.success("Review submitted successfully!");
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          {foodData.name}
        </Typography>

        <Box
          sx={{
            width: 300,
            height: 300,
            margin: '0 auto',
            mb: 2,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={foodData.image_url}
            alt={foodData.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body2">{foodData.description}</Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Ingredients:</strong> {foodData.ingredients.join(', ')}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          <strong>Price:</strong> ₹{price}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          <strong>Qty:</strong>{' '}
          <select
            className="form-select"
            style={{ display: 'inline-block', width: '76px' }}
            value={qty}
            onChange={handlePriceChange}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
          Reviews
        </Typography>

        <Box>
          {user_id && (
            <form onSubmit={makeReview} className="d-flex align-items-center mb-2 gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Add a review"
                value={reviewForm}
                onChange={(e) => setReviewForm(e.target.value)}
              />
              <Rating
                name="rating"
                value={Number(rating)}
                precision={1}
                onChange={(e, newValue) => setRating(newValue)}
              />
              <Button type="submit" variant="contained" color="primary">
                Post
              </Button>
            </form>
          )}
          <Box sx={{ overflowY: 'auto', maxHeight: 100 }}>
            {allReviews.filter((r) => r.item_id === foodData._id).length > 0 ? (
              allReviews
                .filter((r) => r.item_id === foodData._id)
                .map((rev, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Box className="d-flex justify-content-between align-items-center">
                      <Typography variant="body2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person border border-dark rounded m-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        {rev.review}
                      </Typography>
                      <Rating value={rev.rating} readOnly />
                    </Box>
                  </Box>
                ))
            ) : (
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                No reviews yet.
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
          <Button onClick={() => addToCart(foodData)} variant="contained" color="primary">
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
