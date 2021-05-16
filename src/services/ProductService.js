import axios from 'axios';
import { useState } from 'react';
import BaseService from './BaseService';

const PRODUCT_RESOURCE = 'api/v1/products/';

export default class ProductService {
  static async getPopularProduct(data) {
    return await BaseService.get(
      `${PRODUCT_RESOURCE}view`,
      { params: { ordering: '-watch_count' } },
      {}
    );
  }

  static async getTopDropProduct(data) {
    return await BaseService.get(
      `${PRODUCT_RESOURCE}view`,
      { params: { ordering: '-discount_rate' } },
      {}
    );
  }

  static async getProductDetail(id) {
    return await BaseService.get(`${PRODUCT_RESOURCE}${id}`);
  }
}
