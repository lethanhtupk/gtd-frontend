import axios from 'axios';
import { ERROR_UNKNOWN, LOCAL_STORAGE } from '../utils/Constant';

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const DEFAULT_REQUEST_CONFIG = {
  withAuthorization: true,
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error?.config?.url === 'auth/jwt/refresh/' &&
      error?.response?.status === 401
    ) {
      window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      window.localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
      window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (error?.config.url === 'auth/jwt/create/') {
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = window.localStorage.getItem(
        LOCAL_STORAGE.REFRESH_TOKEN
      );
      if (!refreshToken) {
        return Promise.reject(error);
      }
      return new Promise((resolve, reject) => {
        axios
          .post('auth/jwt/refresh/', { refresh: refreshToken })
          .then((res) => {
            const { data } = res;
            window.localStorage.setItem(
              LOCAL_STORAGE.ACCESS_TOKEN,
              data.access
            );
            // axios.defaults.headers.common[
            //   'Authorization'
            // ] = `Bearer ${data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
            processQueue(null, data.token);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

function injectAuthorizationHeader(config = {}) {
  if (!config.withAuthorization) {
    return;
  }
  const authToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (authToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      Accept: 'application/json',
    };
  }
}

const BaseService = {
  get(url, data = {}, config = { ...DEFAULT_REQUEST_CONFIG }) {
    if (data.params) {
      config.params = data.params;
    }

    injectAuthorizationHeader(config);
    config.data = {};

    return new Promise((resolve, reject) => {
      return axios
        .get(url, config)
        .then((res) => {
          if (res.status !== 200 || !res.data) {
            const { data } = res;
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              ...data,
            });
          } else {
            resolve({
              ...res.data,
            });
          }
        })
        .catch((errors) => {
          // TODO: Refactor
          if (errors?.response?.data && errors?.response?.status < 4000) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: errors.response.status,
              errors: {
                ...errors.response.data,
              },
            });
          } else {
            reject(ERROR_UNKNOWN);
          }
        });
    });
  },
  post(url, data = {}, config = DEFAULT_REQUEST_CONFIG) {
    injectAuthorizationHeader(config);
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, config)
        .then((res) => {
          if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
            const { data } = res;
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.status,
              errors: {
                ...data,
              },
            });
          } else {
            resolve({
              code: res.status,
              ...res.data,
            });
          }
        })
        .catch((errors) => {
          // TODO: Refactor
          if (errors?.response?.data && errors?.response?.status < 4000) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: errors.response.status,
              errors: {
                ...errors.response.data,
              },
            });
          } else {
            reject(ERROR_UNKNOWN);
          }
        });
    });
  },
  put(url, data = {}, config = DEFAULT_REQUEST_CONFIG) {
    injectAuthorizationHeader(config);
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, config)
        .then((res) => {
          console.log('res in base service======', res);
          if (res.status !== 200) {
            const { data } = res;
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.status,
              errors: {
                ...data,
              },
            });
          } else {
            resolve({
              code: res.status,
              ...res.data,
            });
          }
        })
        .catch((errors) => {
          console.log('errors in base service========,', errors.response);
          // TODO: Refactor
          if (errors?.response?.data && errors?.response?.status < 4000) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: errors.response.status,
              errors: {
                ...errors.response.data,
              },
            });
          } else {
            reject(ERROR_UNKNOWN);
          }
        });
    });
  },
  delete(url, config = DEFAULT_REQUEST_CONFIG) {
    injectAuthorizationHeader(config);
    config.data = {};
    return new Promise((resolve, reject) => {
      axios
        .delete(url, config)
        .then((res) => {
          console.log('res in base service======', res);
          if (res.status !== 204) {
            const { data } = res;
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.status,
              errors: {
                ...data,
              },
            });
          } else {
            resolve({
              code: res.status,
              ...res.data,
            });
          }
        })
        .catch((errors) => {
          // TODO: Refactor
          console.log('errors in base service========,', errors.response);

          if (errors?.response?.data && errors?.response?.status < 4000) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: errors.response.status,
              errors: {
                ...errors.response.data,
              },
            });
          } else {
            reject(ERROR_UNKNOWN);
          }
        });
    });
  },
};

export default BaseService;
