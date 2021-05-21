import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import WatchService from '../../services/WatchService';
import Pagination from '../Pagination';
import { AuthUserContext } from '../Session';
import withAuthorization from '../Session/withAuthorization';
import ItemWatch from './ItemWatch';

const WatchtList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [watchList, setWatchList] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    WatchService.getListWatches({
      params: { owner: authUser[0]?.id, page: currentPage },
    })
      .then((res) => {
        setWatchList(res.data);
        setLoading(false);
        setPaginationData(res.paging);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        setMessage('There is a system error, please try it later');
      });
  }, [authUser, currentPage]);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex flex-row items-center justify-center">
          <ClipLoader size={50} />
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-center mt-16">
            <div className="w-4/5">
              <div className="grid grid-cols-4">
                {watchList.map((item, index) => (
                  <div className="mr-2 mb-2" key={index}>
                    <ItemWatch watchData={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={paginationData.last_page}
            />
          </div>
        </>
      )}
      <header>
        <title>Your watches - GTD</title>
      </header>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(WatchtList);
