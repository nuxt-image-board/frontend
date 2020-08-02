import Vue from 'vue'
import Viewer from 'v-viewer'

Vue.use(
  Viewer, {
    defaultOptions: {
      button: false,
      navbar: false,
      title: false,
      toolbar: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }
  }
)
