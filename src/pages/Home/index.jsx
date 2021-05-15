import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ProductCarousel from '../../components/Carousel';
import CreateWatch from '../../components/CreateWatch';

const HomePage = () => (
  <>
    <header>
      <title>Home - GTD</title>
    </header>
    <div className="justify-center items-center flex flex-col">
      <div className="flex flex-row justify-center w-full mt-12">
        <CreateWatch />
      </div>
      <div className="popular-product w-4/5 justify-center mt-12">
        <div className="describe">
          <p className="text-blue-600 font-bold text-2xl capitalize">
            Popular Products
          </p>
          <div className="flex flex-row justify-between">
            <p>
              Check out these recently popular deals on our site. See what our
              user recently watching
            </p>
            <Link to={ROUTES.POPULAR_PRODUCTS}>
              <a
                href="/popular-product"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                View all
              </a>
            </Link>
          </div>
        </div>
        <div className=" mt-4">
          <ProductCarousel />
        </div>
      </div>

      <div className="popular-product w-4/5 justify-center mt-12">
        <div className="describe">
          <p className="text-blue-600 font-bold text-2xl capitalize">
            top product drops
          </p>
          <div className="flex flex-row justify-between">
            <p>
              Check out these most product price drops down we are currently
              watching
            </p>
            <Link to={ROUTES.TOP_DROPS_PRODUCT}>
              <a
                href="/top-drop-down"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                View all
              </a>
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <ProductCarousel />
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
