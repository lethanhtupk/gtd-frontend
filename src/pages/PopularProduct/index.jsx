import React from 'react';
import ItemCarousel from '../../components/Carousel/ItemCarousel';
import ProductList from '../../components/ProductList';

const PopularProduct = () => {
  return (
    <>
      <header>
        <title>Popular product - GTD</title>
      </header>
      <div className="flex flex-row justify-center mt-16">
        <div className="w-4/5">
          <div className="describe pb-4">
            <p className="text-blue-600 font-bold text-2xl capitalize">
              Popular Products
            </p>
            <div className="flex flex-row justify-between">
              <p>
                Check out these recently popular deals on our site. See what our
                user recently watching
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="mr-2 mb-2 hover:shadow-2xl">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
            <div className="mr-2 mb-2">
              <ItemCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProduct;
