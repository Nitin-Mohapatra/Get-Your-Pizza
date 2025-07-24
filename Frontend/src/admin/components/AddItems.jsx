import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Stack,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';

export default function AddItems() {
  const fileInputRef = useRef();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [itm_name, setItm_name] = useState('');
  const [itm_price, setItm_price] = useState('');
  const [description, setDescription] = useState('');
  const [categ, setCateg] = useState('');
  const [ingd, setIngd] = useState('');
  const [size, setSize] = useState('');
  const [file, setFile] = useState('');
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const validateFields = () => {
    const newErrors = {};
    if (!itm_name.trim()) newErrors.itm_name = 'Item name is required';
    if (!itm_price) newErrors.itm_price = 'Price is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!categ) newErrors.categ = 'Category is required';
    if (!size) newErrors.size = 'Size is required';
    if (!ingd) newErrors.ingd = 'Ingredients are required';
    if (!file || file.length === 0) newErrors.file = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formHandle = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('itm_name', itm_name);
    formData.append('itm_price', itm_price);
    formData.append('description', description);
    formData.append('categ', categ);
    formData.append('size', size);
    formData.append('ingd', ingd);
    formData.append('file', file[0]);

    try {
      const response = await axios.post('http://localhost:8080/admin/addItem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success('Item Added Successfully');
        setItm_name('');
        setItm_price('');
        setDescription('');
        setCateg('');
        setIngd('');
        setSize('');
        setFile('');
        setImagePreview('');
        setErrors({});
      }
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const openDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={formHandle} noValidate>
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 700,
          mx: 'auto',
          mt: 4,
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600} sx={{ color:'text.primary',textAlign:'center',fontSize: '1.5em', pb: 2 , "@media (max-width: 600px) ":{ fontSize: '1.2em'} }}>
          🍕 Add New Pizza Item
        </Typography>

        {/* Item Name & Price */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <TextField
            fullWidth
            label="Item Name"
            variant="outlined"
            name="itm_name"
            value={itm_name}
            onChange={(e) => setItm_name(e.target.value)}
            error={!!errors.itm_name}
            helperText={errors.itm_name}
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            name="itm_price"
            value={itm_price}
            onChange={(e) => setItm_price(e.target.value)}
            error={!!errors.itm_price}
            helperText={errors.itm_price}
          />
        </Stack>

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ pb: 3 }}
        />

        {/* Category, Size, Ingredients */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          {/* Category */}
          <FormControl fullWidth required error={!!errors.categ}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              value={categ}
              name="categ"
              onChange={(e) => setCateg(e.target.value)}
            >
              <MenuItem value="Veg">Veg</MenuItem>
              <MenuItem value="Non-Veg">Non-Veg</MenuItem>
              <MenuItem value="Cheese Burst">Cheese Burst</MenuItem>
            </Select>
            {errors.categ && (
              <Typography variant="caption" color="error">
                {errors.categ}
              </Typography>
            )}
          </FormControl>

          {/* Size */}
          <FormControl fullWidth required error={!!errors.size}>
            <InputLabel id="size-label">Size</InputLabel>
            <Select
              labelId="size-label"
              id="size-select"
              label="Size"
              value={size}
              name="size"
              onChange={(e) => setSize(e.target.value)}
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
            </Select>
            {errors.size && (
              <Typography variant="caption" color="error">
                {errors.size}
              </Typography>
            )}
          </FormControl>

          {/* Ingredients */}
          <FormControl fullWidth required error={!!errors.ingd}>
            <InputLabel id="ingredients-label">Ingredients</InputLabel>
            <Select
              labelId="ingredients-label"
              id="ingredients-select"
              label="Ingredients"
              value={ingd}
              name="ingd"
              onChange={(e) => setIngd(e.target.value)}
            >
              <MenuItem value="cheese">Cheese</MenuItem>
              <MenuItem value="paneer">Paneer</MenuItem>
              <MenuItem value="chicken">Chicken</MenuItem>
            </Select>
            {errors.ingd && (
              <Typography variant="caption" color="error">
                {errors.ingd}
              </Typography>
            )}
          </FormControl>
        </Stack>

        {/* Image Upload */}
        <Box
          mt={2}
          onClick={openDialog}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#fafafa',
            width: '10em',
            height: '10em',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Click to Upload
            </Typography>
          )}
          <input
            ref={fileInputRef}
            type="file"
            id="DropBox"
            name="file"
            multiple
            onChange={(e) => {
              setFile(e.target.files);
              if (e.target.files && e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            style={{ display: 'none' }}
          />
        </Box>
        {errors.file && (
          <Typography variant="caption" color="error" sx={{ mb: 2 }}>
            {errors.file}
          </Typography>
        )}

        {/* Submit Button */}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
              py: 1,
            }}
          >
            Add Item
          </Button>
        </Box>
      </Paper>
    </form>
  );
}
