export default function ({ $axios }, inject) {
  const api = new API($axios)
  inject('searchApi', api)
}

class API {
  constructor (axios) {
    this.axios = axios
  }

  async requestResults (apiEndpoint, params) {
    const response = await this.axios.get(apiEndpoint, { params, useCache: process.client })
    if (response.data.status === 200) {
      return response.data.data
    } else {
      return false
    }
  }

  async getMylistResults (apiEndpoint, pageID, sortID) {
    const sort = (sortID <= 1) ? 'd' : (sortID <= 3) ? 'i' : 'l'
    const order = [0, 2, 4].includes(sortID) ? 'd' : 'a'
    const params = { page: pageID, sort, order }
    return await this.requestResults(apiEndpoint, params)
  }

  async getSearchResults (apiEndpoint, pageID, sortID, targetID) {
    const sort = (sortID <= 1) ? 'd' : (sortID <= 3) ? 'c' : (sortID <= 5) ? 'l' : 'n'
    const order = [0, 2, 4, 6].includes(sortID) ? 'd' : 'a'
    const params = { page: pageID, id: targetID, sort, order }
    return await this.requestResults(apiEndpoint, params)
  }

  async getListResults (apiEndpoint, pageID, sortID, keyword) {
    const sort = (sortID <= 1) ? 'd' : (sortID <= 3) ? 'c' : (sortID <= 5) ? 'l' : 'n'
    const order = [0, 2, 4, 6].includes(sortID) ? 'd' : 'a'
    const params = { page: pageID, sort, order, keyword }
    return await this.requestResults(apiEndpoint, params)
  }
}
