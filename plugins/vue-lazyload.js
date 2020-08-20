import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.1,
  loading: require('~/assets/images/loading.png'),
  error: require('~/assets/images/error.png'),
  attempt: 1,
  observer: true,

  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
