import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locales/messages.js'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.user.locale,
    fallbackLocale: 'ja',
    messages
  })
}
