import React, { useState, useEffect } from 'react';
import ItemCarousel from '../../components/Carousel/ItemCarousel';
import ProductService from '../../services/ProductService';

const TopDrops = () => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getTopDropProduct()
      .then((res) => {
        setError(false);
        setLoading(false);
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

  return (
    <>
      {error ? (
        <div>{message}</div>
      ) : (
        <div className="flex flex-row justify-center mt-16">
          <div className="w-4/5">
            <div className="describe pb-4">
              <p className="text-blue-600 font-bold text-2xl capitalize">
                Top Drops Products
              </p>
              <div className="flex flex-row justify-between">
                <p>
                  Check out these most product price drops down we are currently
                  watching
                </p>
              </div>
            </div>
            {loading ? (
              <div>Loading data...</div>
            ) : (
              <div className="grid grid-cols-4">
                {productItems.map((item, index) => (
                  <div className="mr-2 mb-2" key={index}>
                    <ItemCarousel data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <header>
        <title>Top Drops product - GTD</title>
      </header>
    </>
  );
};

export default TopDrops;
