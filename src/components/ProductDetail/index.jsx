import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { numberWithCommas, truncate } from '../../utils/Helpers';
import ModalCreate from '../CreateWatch/ModalCreate';
import { PlusIcon } from '../Icons';
import Rating from '../Rating';

const ProductDetail = ({ match }) => {
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getProductDetail(match.params.id)
      .then((res) => {
        setProductData(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {loading ? (
        <div>product on the way</div>
      ) : (
        <div className="w-full flex flex-row justify-center">
          <div className="mt-12 w-4/5">
            <div className="product-overview grid grid-cols-3">
              <div className="image">
                <img src={productData.images[0].base_url} alt="product" />
              </div>
              <div className="overview col-span-2 bg-white ml-2 px-4 py-4">
                <p className="text-gray-600 text-sm flex">
                  Brand:{' '}
                  <p className="text-blue-500 ml-1">{` ${productData.brand.name}`}</p>
                </p>
                <p className="font-light text-xl">{productData.name}</p>
                <div className="rating-section mt-4 flex flex-row">
                  <Rating rate={productData.rating_average} />
                </div>
                <div className="price-section flex flex-row items-center mt-8">
                  <p className="text-2xl font-bold">
                    {numberWithCommas(productData.price)} đ
                  </p>
                  <div className="discount-section ml-4">
                    <div className="flex-row flex">
                      <p className="line-through text-xs">
                        {numberWithCommas(productData.list_price)} đ
                      </p>
                      <p className="line-through text-xs ml-2">{`${productData.discount_rate}%`}</p>
                    </div>
                  </div>
                </div>
                <div className="button-section mt-16 flex flex-row items-center">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(`https://tiki.vn/${productData.url_path}`)
                    }
                    className="text-lg font-semibold py-2 px-8 bg-yellow-300 hover:bg-yellow-400 rounded-lg"
                  >
                    View at Tiki
                  </button>
                  <div
                    className="ml-4 text-red-500 cursor-pointer"
                    onClick={() => setShowModal(!showModal)}
                  >
                    <PlusIcon />
                    <ModalCreate
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-description mt-8">
              <ShowDescription
                showAll={showAll}
                setShowAll={setShowAll}
                description={productData.description}
              />
            </div>
          </div>
        </div>
      )}
      <header>
        <title>{productData.name}</title>
      </header>
    </>
  );
};

export const ShowDescription = ({ showAll, setShowAll, description }) => {
  return (
    <>
      <p className="uppercase text-lg text-black mb-4">Product description</p>
      <div className="bg-white px-8 py-4">
        {showAll ? (
          <>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <div className="w-full flex flex-row justify-center mt-4">
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="border border-blue-500 text-blue-500 rounded-lg px-8 py-2 hover:text-white hover:bg-blue-500 focus:outline-none"
              >
                Compact content
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: truncate(description, 800) }}
            />
            <div className="w-full flex flex-row justify-center mt-4">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="border border-blue-500 text-blue-500 rounded-lg px-8 py-2 hover:text-white hover:bg-blue-500 focus:outline-none"
              >
                Watch more content
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
