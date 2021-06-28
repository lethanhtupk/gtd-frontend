import axios from 'axios';
import { useState } from 'react';
import BaseService from './BaseService';

const SELLER_RESOURCE = 'api/v1/sellers/';
const REQUEST_RESOURCE = 'api/v1/requests/';

export default class SellerService {
  static async getSellers(searchPattern, data) {
    if (searchPattern) {
      return await BaseService.get(
        `${SELLER_RESOURCE}?search=${searchPattern}`,
        data,
        {}
      );
    }
    return await BaseService.get(`${SELLER_RESOURCE}`, data, {});
  }

  static async getSellerById(id, data) {
    return await BaseService.get(`${SELLER_RESOURCE}${id}`, data, {});
  }

  static async createRequest(data) {
    return await BaseService.post(`${REQUEST_RESOURCE}`, data);
  }

  static async getRequests(data) {
    return await BaseService.get(`${REQUEST_RESOURCE}`, data);
  }

  static async deleteRequest(id, data) {
    return await BaseService.delete(`${REQUEST_RESOURCE}${id}`, data);
  }

  // static async getProductDetail(id) {
  //   return await BaseService.get(`${PRODUCT_RESOURCE}${id}`, {});
  // }

  // static async searchProduct(data) {
  //   return await BaseService.get(`${PRODUCT_RESOURCE}search`, data, {});
  // }
}
