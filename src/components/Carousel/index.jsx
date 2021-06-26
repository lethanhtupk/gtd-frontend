import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductService from '../../services/ProductService';
import { SadEmoji } from '../Icons';
import ItemCarousel from './ItemCarousel';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const ProductCarousel = ({ type }) => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const items = [];

  useEffect(() => {
    if (type === 'popular') {
      ProductService.getPopularProduct({ params: { ordering: '-watch_count' } })
        .then((res) => {
          setError(false);
          setLoading(false);
          setProductItems(res.data);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          if (error.code === 4000) {
            setMessage(
              'There is an error in the system. Please contact with the admin'
            );
          } else {
            setMessage(error.errors.detail);
          }
        });
    } else if (type === 'top-drops') {
      ProductService.getTopDropProduct({
        params: { ordering: '-discount_rate' },
      })
        .then((res) => {
          setLoading(false);
          setProductItems(res.data);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          if (error.code === 4000) {
            setMessage(
              'There is an error in the system. Please contact with the admin'
            );
          } else {
            setMessage(error.errors.detail);
          }
        });
    }
  }, []);

  productItems.forEach((item) => {
    items.push(<ItemCarousel data={item} />);
  });

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ClipLoader size={30} />
          <div>Please wait...</div>
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row justify-center text-red-500">
              <SadEmoji />
              <p className="text-sm ">{message}</p>
            </div>
          ) : (
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={responsive}
              controlsStrategy="responsive"
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductCarousel;
