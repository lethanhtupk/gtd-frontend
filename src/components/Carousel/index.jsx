import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductService from '../../services/ProductService';
import ItemCarousel from './ItemCarousel';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const ProductCarousel = () => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const items = [];

  useEffect(() => {
    ProductService.getPopularProduct()
      .then((res) => {
        setProductItems(res.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        if (error.errors.code === 4000) {
          setMessage(
            'There is an error in the system. Please contact with the admin'
          );
        }
        setMessage(error.errors.message);
      });
  }, []);

  productItems.forEach((item) => {
    items.push(<ItemCarousel data={item} />);
  });

  return (
    <>
      {error ? (
        <div>{message}</div>
      ) : (
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="responsive"
        />
      )}
    </>
  );
};

export default ProductCarousel;
