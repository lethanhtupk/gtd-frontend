import React from 'react';
import ProductList from '../../components/ProductList';

const PopularProduct = () => {
  return (
    <>
      <ProductList pageName="popular" />
      <header>
        <title>Popular product - GTD</title>
      </header>
    </>
  );
};

export default PopularProduct;
