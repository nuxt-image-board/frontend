export default function ({
  route,
  store,
  app
}) {
  if (route.query.lang) {
    const supportedlang = ['ja', 'id', 'en']
    if (supportedlang.includes(route.query.lang)) {
      app.i18n.lang = route.query.lang
      store.commit('user/setLocale', route.query.lang)
    }
  }
}
