export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    const path = to.path
    if (path.startsWith('/arts/')) {
      const illustID = path.split('/')[2]
      store.commit(
        'user/addIllustHistory',
        { illustID }
      )
    }
  })
}
