import axios from 'axios';
import BaseService from './BaseService';

const WATCH_RESOURCE = 'api/v1/watches/';

export default class WatchService {
  static async createWatch(data) {
    return await BaseService.post(`${WATCH_RESOURCE}`, data);
  }

  static async getListWatches(data) {
    return await BaseService.get(`${WATCH_RESOURCE}`, data);
  }

  static async getDetailWatch(id) {
    return await BaseService.get(`${WATCH_RESOURCE}${id}`);
  }

  static async updateWatch(id, payload) {
    return await BaseService.put(`${WATCH_RESOURCE}${id}/update`, payload);
  }

  static async deleteWatch(id) {
    return await BaseService.delete(`${WATCH_RESOURCE}${id}/delete`);
  }
}
