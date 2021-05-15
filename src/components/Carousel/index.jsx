import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ItemCarousel from './ItemCarousel';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const items = [
  <ItemCarousel />,
  <ItemCarousel />,
  <ItemCarousel />,
  <ItemCarousel />,
  <ItemCarousel />,
  <ItemCarousel />,
  <ItemCarousel />,
  <ItemCarousel />,
];

const ProductCarousel = () => {
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="responsive"
    />
  );
};

export default ProductCarousel;
