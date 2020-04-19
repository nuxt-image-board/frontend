import axios from 'axios'

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
  async getNavigations ({ commit, state }) {
    // この条件があることで初回のみ取得になる
    if (state.characters.length === 0) {
      const client = axios.create({
        baseURL: process.env.API_ENDPOINT,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.API_KEY
        },
        data: {}
      })
      // コミットすることで状態変更が反映される
      const [characters, tags, artists] = await Promise.all([
        client.get('navigations/characters'),
        client.get('navigations/tags'),
        client.get('navigations/artists')
      ])
      commit('setNavigations', {
        characters: characters.data.data,
        tags: tags.data.data,
        artists: artists.data.data
      })
    }
  }
}
