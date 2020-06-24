// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  // 'hogeFromStore' という名前の状態を管理する
  characters: [],
  tags: [],
  artists: []
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  // ここでは hogeFromStore の状態（値）を変更する処理を定義
  setNavigations (state, payload) {
    state.characters = payload.characters
    state.tags = payload.tags
    state.artists = payload.artists
  }
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  // サーバーサイドの初期化時に自動的に実行される
  async nuxtServerInit ({ dispatch }, req) {
    await dispatch('getNavigations', req)
  },
  async getNavigations ({ commit, rootState }) {
    // 他のファイルに依存する...
    if (rootState.user.isPC) {
      // コミットすることで状態変更が反映される
      const [characters, tags, artists] = await Promise.all([
        this.$axios.get('navigations/characters', { useCache: true }),
        this.$axios.get('navigations/tags', { useCache: true }),
        this.$axios.get('navigations/artists', { useCache: true })
      ])
      commit('setNavigations', {
        characters: characters.data.data,
        tags: tags.data.data,
        artists: artists.data.data
      })
    }
  }
}
