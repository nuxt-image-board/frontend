<template>
  <div>
    <nav v-show="!minimized" class="navbar is-mobile is-fixed-bottom no-bg" role="navigation">
      <MusicPlayer
        ref="musicPlayer"
        @title="setTitle"
        @thumbnail="setThumbnail"
        @currentTime="setCurrentTime"
        @totalTime="setTotalTime"
        @nowPlaying="setNowPlaying"
        @paused="setPaused"
      />
      <div v-if="!minimized" class="navbar-end">
        <div class="navbar-item has-text-centered has-bg">
          <nav class="level">
            <div class="level-item">
              <a :href="nowPlaying" target="_blank" rel="noopener noreferrer" class="has-text-white" @click="$refs.musicPlayer.pause()">
                <img v-if="thumbnail && $store.state.user.playerShowThumbnail" class="image" :src="thumbnail">
              </a>
            </div>
            <div class="level-item">
              <a :href="nowPlaying" target="_blank" rel="noopener noreferrer" class="has-text-white" @click="$refs.musicPlayer.pause()">
                &nbsp;{{ title }} {{ currentTime }} / {{ totalTime }}&nbsp;
              </a>
            </div>
            <div class="level-item">
              <nav class="level is-mobile">
                <a class="level-item has-text-centered" @click="$refs.musicPlayer.backward()">
                  <Fas i="step-backward" classes="has-text-white" />
                </a>
                <a v-if="isPaused" class="level-item has-text-centered" @click="$refs.musicPlayer.play()">
                  <Fas i="play" classes="has-text-white" />
                </a>
                <a v-else class="level-item has-text-centered" @click="$refs.musicPlayer.pause()">
                  <Fas i="pause" classes="has-text-white" />
                </a>
                <a class="level-item has-text-centered" @click="$refs.musicPlayer.forward()">
                  <Fas i="step-forward" classes="has-text-white" />
                </a>
                <a class="level-item has-text-centered" @click="$refs.musicPlayer.openMenu = true">
                  <Fas i="tools" classes="has-text-white" />
                </a>
                <a class="level-item has-text-centered" @click="minimized = true">
                  <Fas i="times-circle" classes="has-text-white" />
                </a>
              </nav>
            </div>
          </nav>
        </div>
      </div>
    </nav>
    <div v-if="minimized" style="position: fixed; bottom: -3px; right:-3px;">
      <button class="button has-bg" @click="minimized = false">
        <Fas i="music" classes="has-text-white" />
      </button>
    </div>
  </div>
</template>

<style>
@media (max-width: 1024px) {
  .no-bg {
    pointer-events:none;
    background-color: #955E4B;
  }
}

@media (min-width: 1024px) {
  .no-bg {
    pointer-events:none;
    background-color: transparent;
  }
}

.has-bg {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-color: transparent;
  pointer-events: auto;
  background-color: #955E4B;
}
</style>

<script>
import Fas from '@/components/ui/Fas.vue'
import MusicPlayer from '@/components/ui/MusicPlayer.vue'

export default {
  components: {
    Fas,
    MusicPlayer
  },
  data () {
    return {
      title: '読込中',
      thumbnail: '',
      currentTime: '00:00',
      totalTime: '00:00',
      nowPlaying: '#',
      minimized: false,
      isPaused: false
    }
  },
  methods: {
    setTitle (value) {
      this.title = value
    },
    setThumbnail (value) {
      this.thumbnail = value
    },
    setCurrentTime (value) {
      this.currentTime = value
    },
    setTotalTime (value) {
      this.totalTime = value
    },
    setNowPlaying (value) {
      this.nowPlaying = value
    },
    setPaused (value) {
      this.isPaused = value
    }
  }
}
</script>
