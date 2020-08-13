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
  illustHistory: [],
  obtainedProducts: [],
  mutedArtists: [],
  mylistCount: 0,
  isBookmarkAddable: true,
  isArtistMuteAddable: true
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
  logout (state) {
    state.isLogined = false
  },
  addIllustHistory (state, illustID) {
    illustID = illustID.illustID
    state.illustHistory = state.illustHistory.filter(
      illust => illust !== illustID
    )
    state.illustHistory.unshift(illustID)
    if (state.illustHistory.length > 20) {
      state.illustHistory.pop()
    }
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
  },
  addArtistMute (state, artistID) {
    state.mutedArtists = state.mutedArtists.filter(artist => artist !== artistID)
    state.mutedArtists.push(artistID)
    if (
      (state.obtainedProducts.includes(9) && state.mutedArtists.length <= 10) ||
      (state.obtainedProducts.includes(10) && state.mutedArtists.length <= 30) ||
      (state.obtainedProducts.includes(11) && state.mutedArtists.length <= 100)
    ) {
      state.isArtistMuteAddable = true
    } else {
      state.isArtistMuteAddable = false
    }
  },
  removeArtistMute (state, artistID) {
    state.mutedArtists = state.mutedArtists.filter(artist => artist !== artistID)
    state.isArtistMuteAddable = true
  },
  setArtistMuteIds (state, artistIDs) {
    state.mutedArtists = artistIDs
    if (
      (state.obtainedProducts.includes(9) && state.mutedArtists.length <= 10) ||
      (state.obtainedProducts.includes(10) && state.mutedArtists.length <= 30) ||
      (state.obtainedProducts.includes(11) && state.mutedArtists.length <= 100)
    ) {
      state.isArtistMuteAddable = true
    } else {
      state.isArtistMuteAddable = false
    }
  },
  addBookmark (state) {
    if (
      (state.mylistCount <= 50) ||
      (state.obtainedProducts.includes(6) && state.mylistCount <= 100) ||
      (state.obtainedProducts.includes(7) && state.mylistCount <= 300) ||
      (state.obtainedProducts.includes(8) && state.mylistCount <= 1000)
    ) {
      state.mylistCount += 1
      state.isBookmarkAddable = true
    } else {
      state.isBookmarkAddable = false
    }
  },
  removeBookmark (state) {
    if (state.mylistCount > 0) {
      state.mylistCount -= 1
      state.isBookmarkAddable = true
    }
  },
  setBookmarkCount (state, count) {
    state.mylistCount = count
    if (
      (state.mylistCount <= 50) ||
      (state.obtainedProducts.includes(6) && state.mylistCount <= 100) ||
      (state.obtainedProducts.includes(7) && state.mylistCount <= 300) ||
      (state.obtainedProducts.includes(8) && state.mylistCount <= 1000)
    ) {
      state.isBookmarkAddable = true
    } else {
      state.isBookmarkAddable = false
    }
  }
}
