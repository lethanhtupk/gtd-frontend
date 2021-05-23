import axios from 'axios';
import { useState } from 'react';
import BaseService from './BaseService';

const PRODUCT_RESOURCE = 'api/v1/products/';

export default class ProductService {
  static async getPopularProduct(data) {
    return await BaseService.get(`${PRODUCT_RESOURCE}view`, data, {});
  }

  static async getTopDropProduct(data) {
    return await BaseService.get(`${PRODUCT_RESOURCE}view`, data, {});
  }

  static async getProductDetail(id) {
    return await BaseService.get(`${PRODUCT_RESOURCE}${id}`, {});
  }

  static async searchProduct(data) {
    return await BaseService.get(`${PRODUCT_RESOURCE}search`, data, {});
  }
}
