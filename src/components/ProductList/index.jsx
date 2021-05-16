import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import ItemCarousel from '../Carousel/ItemCarousel';
import Pagination from '../Pagination';

const ProductList = ({ pageName }) => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    if (pageName === 'popular') {
      ProductService.getPopularProduct({ params: { ordering: '-watch_count' } })
        .then((res) => {
          setError(false);
          setLoading(false);
          setProductItems(res.data);
          setCurrentPage(res.paging.current_page);
          setPaginationData(res.paging);
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
    } else if (pageName === 'drop') {
      ProductService.getTopDropProduct({
        params: { ordering: '-discount_rate' },
      })
        .then((res) => {
          setError(false);
          setLoading(false);
          setProductItems(res.data);
          setCurrentPage(res.paging.current_page);
          setPaginationData(res.paging);
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
    }
  }, []);

  useEffect(() => {
    if (pageName === 'popular') {
      ProductService.getPopularProduct({
        params: { ordering: '-watch_count', page: currentPage },
      })
        .then((res) => {
          setError(false);
          setLoading(false);
          setProductItems(res.data);
          setPaginationData(res.paging);
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
    } else if (pageName === 'drop') {
      ProductService.getPopularProduct({
        params: { ordering: '-discount_rate', page: currentPage },
      })
        .then((res) => {
          setError(false);
          setLoading(false);
          setProductItems(res.data);
          setPaginationData(res.paging);
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
    }
  }, [currentPage]);

  return (
    <>
      {error ? (
        <div>{message}</div>
      ) : (
        <div className="flex flex-row justify-center mt-16">
          <div className="w-4/5">
            <div className="describe pb-4">
              <p className="text-blue-600 font-bold text-2xl capitalize">
                Popular Products
              </p>
              <div className="flex flex-row justify-between">
                <p>
                  Check out these recently popular deals on our site. See what
                  our user recently watching
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
            <div className="flex flex-row justify-center">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={paginationData.last_page}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
