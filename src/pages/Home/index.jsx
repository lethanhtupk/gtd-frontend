import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ProductCarousel from '../../components/Carousel';
import CreateWatch from '../../components/CreateWatch';
import AuthUserContext from '../../components/Session/context';

const HomePage = () => {
  const { authUser } = useContext(AuthUserContext);

  return (
    <>
      <header>
        <title>Home - GTD</title>
      </header>
      <div className="flex flex-col items-center justify-center">
        {authUser[0] ? (
          <div className="flex flex-row justify-center w-full mt-12">
            <CreateWatch />
          </div>
        ) : null}

        <div className="justify-center w-4/5 mt-12 popular-product">
          <div className="describe">
            <p className="text-2xl font-bold text-blue-600 capitalize">
              Sản phẩm phổ biến
            </p>
            <div className="flex flex-row justify-between">
              <p>
                Xem các sản phẩm đang được quan tâm và theo dõi nhiều bởi người
                dùng sử dụng dịch vụ của chúng tôi.
              </p>
              <div className="flex justify-end">
                <Link to={ROUTES.POPULAR_PRODUCTS}>
                  <p className="text-blue-500 hover:text-blue-600 hover:underline">
                    Xem thêm
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4 ">
            <ProductCarousel type="popular" />
          </div>
        </div>

        <div className="justify-center w-4/5 mt-12 popular-product">
          <div className="describe">
            <p className="text-2xl font-bold text-blue-600 capitalize">
              Sản phẩm giảm sâu
            </p>
            <div className="flex flex-row justify-between">
              <p>
                Xem các sản phẩm giảm giá sâu đang được chúng tôi theo dõi trên
                hệ thống
              </p>
              <div className="flex justify-end">
                <Link to={ROUTES.TOP_DROPS_PRODUCT}>
                  <p className="text-blue-500 hover:text-blue-600 hover:underline">
                    Xem thêm
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ProductCarousel type="top-drops" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
