import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { useState } from 'react';
import BasicModal from './BasicModal';
import { useCart, useDispatch } from './CartProvider';

export default function CardWrapper({ foodData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cart = useCart();
  const dispatch = useDispatch();

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{foodData.name}</Typography>
        <Typography level="body-sm">{foodData.description}</Typography>
        <IconButton
          aria-label="bookmark"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={foodData.image_url}
          srcSet={foodData.image_url}
          loading="lazy"
          alt={foodData.name}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>₹ {foodData.price}</Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          onClick={handleOpen}
        >
          Explore
        </Button>
      </CardContent>

      {/* Modal for food details */}
      <BasicModal openModal={open} handleClose={handleClose} foodData={foodData} />
    </Card>
  );
}
