import React from 'react';
import ProductList from '../../components/ProductList';

const ManageShop = () => {
  return (
    <div>
      <ProductList pageName="shop-products" />
      <header>
        <title>Your shop - GTD</title>
      </header>
    </div>
  );
};

export default ManageShop;
