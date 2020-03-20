// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  navigations: {
    characters: '',
    tags: '',
    artists: ''
  }
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  // ここでは hogeFromStore の状態（値）を変更する処理を定義
  setCharactersNavigationData (state, value) {
    state.navigations.characters = value
  },
  setTagsNavigationData (state, value) {
    state.navigations.tags = value
  },
  setArtistsNavigationData (state, value) {
    state.navigations.artists = value
  }
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  async getNavigationData ({ commit }) {
    const [characters, tags, artists] = await Promise.all([
      this.$axios.get('/navigations/characters'),
      this.$axios.get('/navigations/tags'),
      this.$axios.get('/navigations/artists')
    ])
    commit('setCharactersNavigationData', characters)
    commit('setTagsNavigationData', tags)
    commit('setArtistsNavigationData', artists)
  }
}
