import axios from 'axios';
import BaseService from './BaseService';

const AUTH_RESOURCES = '/auth';

export default class AccountServices {
  static async createAccount(accountData) {
    return await BaseService.post(`${AUTH_RESOURCES}/users/`, accountData, {});
  }

  static async login(accountData) {
    return await BaseService.post(
      `${AUTH_RESOURCES}/jwt/create/`,
      accountData,
      {}
    );
  }

  static async verify(jwtToken) {
    return await BaseService.post(
      `${AUTH_RESOURCES}/jwt/verify`,
      { token: jwtToken },
      {}
    );
  }

  static async refreshToken(refreshToken) {
    return await BaseService.post(
      `${AUTH_RESOURCES}/jwt/refresh/`,
      { refresh: refreshToken },
      {}
    );
  }

  static async currentUser() {
    return await BaseService.get('api/v1/profiles/me');
  }

  static async editProfile(id, payload) {
    return await BaseService.put(`api/v1/profiles/${id}`, payload);
  }

  static async changePassword(data) {
    return await BaseService.post('auth/users/set_password/', data);
  }

  static async activateAccount(data) {
    return await BaseService.post('auth/users/activation/', data);
  }

  static async resendActivation(data) {
    return await BaseService.post('auth/users/resend_activation/', data, {});
  }
}
