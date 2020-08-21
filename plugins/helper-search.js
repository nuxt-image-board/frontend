export default function ({ $axios }, inject) {
  const api = new API($axios)
  inject('searchApi', api)
}

class API {
  constructor (axios) {
    this.axios = axios
  }

  async getSearchResults (apiEndpoint, pageID, sortID) {
    const sort = (sortID <= 1) ? 'd' : (sortID <= 3) ? 'c' : (sortID <= 5) ? 'l' : 'n'
    const order = [0, 2, 4, 6].includes(sortID) ? 'd' : 'a'
    const id = isFinite(this.$route.params.id) ? parseInt(this.$route.params.id) : 1
    const params = { page: pageID, sort, order, id }
    const response = await this.axios.get(apiEndpoint, { params, useCache: process.client })
    return response.data
  }

  async getListResults (apiEndpoint, pageID, sortID, keyword) {
    const sort = (sortID <= 1) ? 'd' : (sortID <= 3) ? 'c' : (sortID <= 5) ? 'l' : 'n'
    const order = [0, 2, 4, 6].includes(sortID) ? 'd' : 'a'
    const params = { page: pageID, sort, order, keyword }
    const response = await this.axios.get(apiEndpoint, { params, useCache: process.client })
    return response.data.data
  }
}
