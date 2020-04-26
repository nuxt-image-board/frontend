<template>
  <nav class="level box is-mobile" style="width:45%">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <p>
          {{ musics[currentMusic].name }} 00:00 / 00:00
        </p><br>
      </div>
      <div class="level-item">
        <button class="button" @click="paused = !paused">
          <Fas v-if="!paused" i="play" />
          <Fas v-if="paused" i="pause" />
        </button>
      </div>
      <div class="level-item">
        <button class="button" :class="{'is-primary': repeat}" @click="repeatToggle">
          <Fas i="redo" />
        </button>
      </div>
      <div class="level-item">
        <input
          class="slider is-fullwidth is-small is-circle"
          step="1"
          min="0"
          max="100"
          value="50"
          type="range"
        >
      </div>
      <div class="level-item">
        <button class="button" @click="prevMusic">
          <Fas i="chevron-left" />
        </button>
      </div>
      <div class="level-item">
        <button class="button" @click="nextMusic">
          <Fas i="chevron-right" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  props: {
    endpoint: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      paused: false,
      repeat: false,
      time: 0,
      currentMusic: 0,
      musics: [
        {
          name: 'DaydreamCafe',
          file: 'test1.mp3'
        },
        {
          name: '2',
          file: 'test2.mp3'
        },
        {
          name: '3',
          file: 'test3.mp3'
        }
      ]
    }
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    nextMusic () {
      if (this.currentMusic < this.musics.length - 1) {
        this.currentMusic += 1
      } else {
        this.currentMusic = 0
      }
    },
    prevMusic () {
      if (this.currentMusic !== 0) {
        this.currentMusic -= 1
      } else {
        this.currentMusic = this.musics.length - 1
      }
    },
    repeatToggle () {
      this.repeat = !this.repeat
    },
    playToggle () {
      alert('none')
    }
  }
}
</script>
