import React, { useState, useEffect } from 'react';
import ItemCarousel from '../../components/Carousel/ItemCarousel';
import ProductList from '../../components/ProductList';
import ProductService from '../../services/ProductService';

const TopDrops = () => {
  return (
    <>
      <ProductList pageName="drop" />
      <header>
        <title>Top Drops product - GTD</title>
      </header>
    </>
  );
};

export default TopDrops;
