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
              Popular Products
            </p>
            <div className="flex flex-row justify-between">
              <div className="w-3/4">
                <p>
                  Check out these recently popular deals on our site. See what
                  our user recently watching
                </p>
              </div>
              <div className="flex justify-end w-1/4">
                <Link to={ROUTES.POPULAR_PRODUCTS}>
                  <p className="text-blue-500 hover:text-blue-600 hover:underline">
                    View all
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
              top product drops
            </p>
            <div className="flex flex-row justify-between">
              <div className="w-3/4">
                <p>
                  Check out these most product price drops down we are currently
                  watching
                </p>
              </div>
              <div className="flex justify-end w-1/4">
                <Link to={ROUTES.TOP_DROPS_PRODUCT}>
                  <p className="text-blue-500 hover:text-blue-600 hover:underline">
                    View all
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
