import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductService from '../../services/ProductService';
import { FailedAlert } from '../Alert';
import ItemCarousel from '../Carousel/ItemCarousel';
import * as ROUTES from '../../constants/routes';
import Pagination from '../Pagination';

const ProductList = ({ pageName, search, page }) => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(page);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    if (pageName === 'popular') {
      ProductService.getPopularProduct({
        params: { ordering: '-watch_count', page: currentPage },
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
          if (error.code === 4000) {
            setMessage('Có lỗi hệ thống, liên hệ với admin ngay!');
          } else {
            setMessage(error.errors.detail);
          }
        });
    } else if (pageName === 'drop') {
      ProductService.getTopDropProduct({
        params: { ordering: '-discount_rate', page: currentPage },
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
          if (error.code === 4000) {
            setMessage('Có lỗi hệ thống, liên hệ với admin ngay!');
          } else {
            setMessage(error.errors.detail);
          }
        });
    } else if (pageName === 'search-result') {
      setLoading(true);
      ProductService.searchProduct({
        params: { limit: 12, search, page: currentPage },
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
          if (error.code === 4000) {
            setMessage('Có lỗi hệ thống, liên hệ với admin ngay!');
          } else {
            setMessage(error.errors.detail);
          }
        });
    } else if (pageName === 'shop-products') {
      setLoading(true);
      ProductService.shopProducts({
        params: { limit: 12, search, page: currentPage },
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
          if (error.code === 4000) {
            setMessage('Có lỗi hệ thống, liên hệ với admin ngay!');
          } else {
            setMessage('Có lỗi hệ thống, liên hệ với admin ngay!');
          }
        });
    }
  }, [currentPage, search]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <ClipLoader size={50} />
            <div>Xin chờ...</div>
          </div>
        </>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center">
                <FailedAlert message={message} />
                <div className="flex mt-4 text-xl">
                  <p>Back to&nbsp;</p>
                  <Link
                    to={ROUTES.HOME}
                    className="text-blue-500 hover:underline"
                  >
                    Trang chủ
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center mt-16">
              <div className="w-4/5">
                <div className="pb-4 describe">
                  {pageName === 'popular' ? (
                    <>
                      <p className="text-2xl font-bold text-blue-600 capitalize">
                        Sản phẩm phổ biến
                      </p>
                      <div className="flex flex-row justify-between">
                        <p>
                          Các sản phẩm được quan tâm và theo dõi nhiều trên hệ
                          thống của chúng tôi
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {pageName === 'drops' ? (
                        <>
                          <p className="text-2xl font-bold text-blue-600 capitalize">
                            Top drops products
                          </p>
                          <div className="flex flex-row justify-between">
                            <p>
                              Các sản phẩm giảm giá sâu đang được chúng tôi theo
                              dõi
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          {pageName === 'shop-products' ? (
                            <>
                              <p className="text-2xl font-bold text-blue-600 capitalize">
                                Các sản phẩm thuộc cửa hàng của bạn
                              </p>
                              <div className="flex flex-row justify-between">
                                Kiểm tra các sản phẩm của bạn đang được quan tâm
                                và theo dõi thế nào. Bạn có thể cân đối lại giá
                                bán để tối ưu hóa lợi nhuận
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-2xl font-bold text-blue-600 capitalize">
                                Kết quả từ Tiki
                              </p>
                              <div className="flex flex-row justify-between">
                                Các sản phẩm được tìm thấy trên Tiki, hãy chọn
                                sản phẩm yêu thích và theo dõi nó ngay nào!
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                {loading ? (
                  <div className="flex flex-row items-center justify-center w-full h-full">
                    <ClipLoader size={50} />
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    {productItems.map((item, index) => (
                      <div className="mb-2 mr-2" key={index}>
                        <ItemCarousel data={item} pageName={pageName} />
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
      )}
    </>
  );
};

export default ProductList;
