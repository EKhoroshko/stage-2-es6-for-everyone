import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    try {
      const detailfighter = await callApi(`details/fighter/${id}.json`);
      return detailfighter;
    } catch (error) {
      throw error;
    }
    // endpoint - `details/fighter/${id}.json`;
  }
}

export const fighterService = new FighterService();
