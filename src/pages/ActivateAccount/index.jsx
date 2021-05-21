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
        <div className="flex flex-row justify-center items-center w-full h-full">
          <ClipLoader size={50} />
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <p className="uppercase text-2xl font-semibold text-red-500">
                  Failed to activate
                </p>
                <p className="mt-4 text-xl text-red-400">
                  Your account already activated.
                </p>
                <p className="mt-4 fex flex-row">
                  <p className="flex">
                    If you make sure your account has not been activated yet,
                    maybe the activation link has been broken, please
                    click&nbsp;
                    <Link to={ROUTES.RESEND_ACTIVATION}>
                      <p className="text-blue-500 hover:underline cursor-pointer">
                        {' '}
                        here
                      </p>
                    </Link>
                    &nbsp;to request new activation email.
                  </p>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <p className="uppercase text-2xl font-semibold text-green-500">
                  Activate your account successful
                </p>
                <p className="mt-8">
                  Congratulation, you already activated your account successful,
                  you can now login to our site to start tracking your favorite
                  product
                </p>
                <p className="flex flex-row">
                  Click&nbsp;
                  <Link to={ROUTES.LOGIN}>
                    <p className="text-blue-500 hover:underline cursor-pointer">
                      {' '}
                      here
                    </p>
                  </Link>
                  &nbsp;to login now
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
