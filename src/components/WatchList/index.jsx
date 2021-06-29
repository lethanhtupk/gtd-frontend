import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import WatchService from '../../services/WatchService';
import Pagination from '../Pagination';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import withAuthorization from '../Session/withAuthorization';
import ItemWatch from './ItemWatch';
import { FailedAlert } from '../Alert';
import { NoItem } from '../NoItem';
import { displayWatchStatus } from '../../utils/Helpers';

const WatchtList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [watchList, setWatchList] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (status) {
      params.status = status;
    }
    WatchService.getListWatches({
      params: { owner: authUser[0]?.id, page: currentPage, ...params },
    })
      .then((res) => {
        setWatchList(res.data);
        setLoading(false);
        setPaginationData(res.paging);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        if (error.code === 4000) {
          setMessage('Có lỗi hệ thống, liên hệ admin ngay.');
        } else {
          setMessage(error.errors.detail);
        }
      });
  }, [authUser, currentPage, status]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ClipLoader size={50} />
          <div>Xin chờ...</div>
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center">
                <FailedAlert message={message} />
                <div className="flex mt-4 text-xl">
                  <p>Quay lại&nbsp;</p>
                  <Link
                    to={ROUTES.HOME}
                    className="text-blue-500 hover:underline"
                  >
                    trang chủ
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {watchList.length === 0 ? (
                <div className="flex flex-row items-center justify-center py-32 rounded-2xl">
                  <NoItem />
                </div>
              ) : (
                <>
                  <div className="flex flex-row justify-center mt-16">
                    <div className="flex justify-end w-4/5">
                      <select
                        name="status"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:outline-none md:w-1/6"
                      >
                        <option value={null} label="--Tất cả--" defaultValue />
                        <option value="1" label={displayWatchStatus(1)} />
                        <option value="2" label={displayWatchStatus(2)} />
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col items-center mt-8">
                    <div className="w-4/5">
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {watchList.map((item, index) => (
                          <div className="mb-2 mr-2" key={index}>
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
            </>
          )}
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
