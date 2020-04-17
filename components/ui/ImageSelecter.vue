<template>
  <nav class="level">
    <div v-if="imageSource.length > 1 && !isButtonDisabled" class="level-item is-vcentered has-text-centered is-hidden-touch">
      <button class="button is-large is-primary" :disabled="isDecreaseDisabledC" @click="decreasePage">
        &lt;
      </button>
    </div>
    <div class="level-item is-vcentered has-text-centered">
      <img class="image is-128x128" :src="selectedImage">
    </div>
    <div v-if="imageSource.length > 1 && !isButtonDisabled" class="level-item is-vcentered has-text-centered is-hidden-touch">
      <button class="button is-large is-primary" :disabled="isIncreaseDisabledC" @click="increasePage">
        &gt;
      </button>
    </div>
    <div v-if="imageSource.length > 1 && !isButtonDisabled" class="level-item is-vcentered has-text-centered is-hidden-desktop">
      <button class="button is-large is-primary" :disabled="isDecreaseDisabledC" @click="decreasePage">
        &lt;
      </button>
      <button class="button is-large is-primary" :disabled="isIncreaseDisabledC" @click="increasePage">
        &gt;
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    imageSource: {
      type: Array,
      default: () => {
        return []
      }
    },
    isIncreaseDisabled: {
      type: Boolean,
      default: false
    },
    isDecreaseDisabled: {
      type: Boolean,
      default: true
    },
    isButtonDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    selectedImage () {
      return this.imageSource[this.currentPage]
    }
  },
  watch: {
    imageSource () {
      if (this.imageSource.length === 1) {
        this.isIncreaseDisabled = true
      }
    }
  },
  methods: {
    increasePage () {
      this.currentPage += 1
      this.$emit('onSelectedImageChanged', this.currentPage)
      if (this.currentPage === this.imageSource.length - 1) {
        this.isIncreaseDisabledC = true
      }
      this.isDecreaseDisabledC = false
    },
    decreasePage () {
      this.currentPage -= 1
      this.$emit('onSelectedImageChanged', this.currentPage)
      if (this.currentPage === 0) {
        this.isDecreaseDisabledC = true
      }
      this.isIncreaseDisabledC = false
    }
  },
  created () {
    this.isIncreaseDisabledC = this.isIncreaseDisabled
    this.isDecreaseDisabledC = this.isDecreaseDisabled
  }
}
</script>
