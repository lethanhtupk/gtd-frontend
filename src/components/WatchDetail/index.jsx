import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import WatchService from '../../services/WatchService';

const WatchDetail = ({ match }) => {
  const [watchData, setWatchData] = useState();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState();

  useEffect(() => {
    WatchService.getDetailWatch(match.params.id)
      .then((res) => {
        setWatchData(res);
        console.log(res);
        ProductService.getProductDetail(res?.product).then((res) => {
          setProductData(res);
          console.log(res);
        });
      })
      .catch((error) => console.log('query product error: ', error))
      .catch((error) => console.log('query watches error'));
  }, []);

  return (
    <>
      <div>
        <p>Watch detail page</p>
      </div>
      <header>
        <title>Watch Detail - GTD</title>
      </header>
    </>
  );
};

export default WatchDetail;
