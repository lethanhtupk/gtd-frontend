import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import AccountServices from '../../services/AccountService';
import * as ROUTES from '../../constants/routes';
import { LOCAL_STORAGE } from '../../utils/Constant';

const ActivateAccount = (props) => {
  const { match } = props;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AccountServices.activateAccount({
      uid: match.params.uid,
      token: match.params.token,
    })
      .then((res) => {
        setLoading(false);
        setError();
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (accessToken && accessToken !== 'undefined') {
    props.history.push(ROUTES.HOME);
  }

  return (
    <>
      {loading ? (
        <div className="flex flex-row items-center justify-center w-full h-full">
          <ClipLoader size={50} />
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-semibold text-red-500 uppercase">
                  Failed to activate
                </p>
                <p className="mt-4 text-xl text-red-400">
                  Tài khoản của bạn đã được kích hoạt
                </p>
                <p className="flex-row mt-4 fex">
                  <p className="flex">
                    Nếu bạn chắc chắn tài khoản của bạn chưa được kích hoạt, vui
                    lòng click&nbsp;
                    <Link to={ROUTES.RESEND_ACTIVATION}>
                      <p className="text-blue-500 cursor-pointer hover:underline">
                        {' '}
                        vào đây
                      </p>
                    </Link>
                    &nbsp;để yêu cầu một email kích hoạt mới
                  </p>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-semibold text-green-500 uppercase">
                  Kích hoạt tài khoản thành công
                </p>
                <p className="mt-8">
                  Chúc mừng bạn kích hoạt tài khoản thành công, hãy đăng nhập
                  ngay để theo dõi sản phẩm yêu thích của bạn.
                </p>
                <p className="flex flex-row">
                  Click&nbsp;
                  <Link to={ROUTES.LOGIN}>
                    <p className="text-blue-500 cursor-pointer hover:underline">
                      {' '}
                      ở đây
                    </p>
                  </Link>
                  &nbsp;để đăng nhập ngay.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      <header>
        <title>Activate new account - GTD </title>
      </header>
    </>
  );
};

export default withRouter(ActivateAccount);
