export default async ({ app, $axios, store }) => {
  await app.router.afterEach(async (to, from) => {
    const path = to.path
    if (
      path.startsWith('/search/') &&
      !path.includes('methods') &&
      !path.includes('list') &&
      !path.includes('keyword') &&
      !path.includes('image') &&
      !path.includes('multiple')
    ) {
      const searchID = path.split('/')[3]
      const searchType = path.split('/')[2]
      let storeHistory
      if (store.state.user.searchHistory.length > 0) {
        storeHistory = store.state.user.searchHistory[0]
      } else {
        storeHistory = { type: -1, id: -1 }
      }
      if (storeHistory.type !== searchType || storeHistory.id !== searchID) {
        const resp = await $axios.get(`${searchType}s/${searchID}`, { useCache: true })
        store.commit(
          'user/addSearchHistory',
          { type: searchType, id: searchID, title: resp.data.data.name }
        )
      }
    }
  })
}
