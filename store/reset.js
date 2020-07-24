const initialState = {}

export const state = () => Object.assign({}, initialState)

export const mutations = {
  destroySession (state) {
    for (const key in state) {
      state[key] = ''
    }
  }
}
