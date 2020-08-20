export default function ({ $axios }, inject) {
  const api = new API($axios)
  inject('searchApi', api)
}

class API {
  constructor (axios) {
    this.axios = axios
  }

  async getHoge () {
    const res = await this.axios.$get('navigations/artists')
    console.log(res)
  }
}
