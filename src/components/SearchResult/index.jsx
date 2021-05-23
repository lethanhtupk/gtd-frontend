import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import ProductList from '../ProductList';

const SearchResult = (props) => {
  const searchPattern = encodeURI(props.location.state.search);

  return (
    <div className="search-result">
      <ProductList pageName="search-result" search={searchPattern} />
    </div>
  );
};

export default withRouter(SearchResult);
