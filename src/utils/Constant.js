import React from 'react';
import { HomeIcon, PenIcon, LockIcon } from '../components/Icons';

export const DEFAULT_LIMIT_DATA_IN_PAGE = 10;

export const ROLES = {
  ADMIN: 2,
  USER: 1,
};

export const TOGGLE_STATE = {
  GRID: 1,
  LIST: 2,
};

export const FROM_PAGE = {
  HOME: 1,
  LIST: 2,
  DETAIL: 3,
};

export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'access',
  REFRESH_TOKEN: 'refresh',
  USER_INFO: 'user_info',
  TOGGLE_STATE: 'toggle_state',
  CONFETTI_STATE: 'confetti_state',
};

export const CONFETTI_TYPE = {
  FAVORITE: 'favorite',
  BORROW: 'borrow',
  SCAN_QR: 'scan_qr',
};

export const ERROR_CODES = {
  GENERAL_ERROR: 4000,
  BOOK_TITLE_NOT_FOUND: 1002,
};

export const ERROR_UNKNOWN = {
  code: ERROR_CODES.GENERAL_ERROR,
  errors: {
    message: 'Hệ thống đang có lỗi xảy ra. Vui lòng thử lại sau!',
  },
};

export const sideBarData = [
  {
    key: 0,
    path: '/account/overview',
    name: 'Account Overview',
    title: 'Account Overview - GTD',
    icon: <HomeIcon />,
  },
  {
    key: 1,
    path: '/account/edit/',
    name: 'Edit Profile',
    title: 'Edit Profile - GTD',
    icon: <PenIcon />,
  },
  {
    key: 2,
    path: '/account/change-password',
    name: 'Change password',
    title: 'Change your password - GTD',
    icon: <LockIcon />,
  },
];

export const DEFAULT_MESSAGE_SUCCESS = 'Thao tác thành công!';
export const DEFAULT_MESSAGE_FAILED = 'Có lỗi xảy ra!';
