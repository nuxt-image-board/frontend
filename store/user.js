// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  acceptR18: false,
  isPC: false,
  isLeftHanded: false,
  useSwipe: false,
  useBottom: false,
  useJump: false,
  useBack: false,
  useWebP: false,
  useInfinity: false,
  useSakura: false,
  searchHistory: [],
  obtainedProducts: []
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  toggleSetting (state, path) {
    state[path] = !state[path]
  },
  enableSetting (state, path) {
    state[path] = true
  },
  disableSetting (state, path) {
    state[path] = false
  },
  updateSetting (state, { path, param }) {
    state[path] = param
  },
  addSearchHistory (state, history) {
    state.searchHistory.forEach((h, index) => {
      if (h.id === history.id && h.type === history.type) {
        state.searchHistory.splice(index, 1)
      }
    })
    state.searchHistory.unshift(history)
    if (state.searchHistory.length > 6) {
      state.searchHistory.pop()
    }
  },
  setObtainedProducts (state, obtainedProducts) {
    state.obtainedProducts = obtainedProducts
  }
}
