<template>
  <div class="quickview" :class="{ 'is-active': openMenu, 'is-left' : !$store.state.user.isLeftHanded }">
    <MusicPlayer
      ref="musicPlayer"
      @title="setTitle"
      @thumbnail="setThumbnail"
      @currentTime="setCurrentTime"
      @totalTime="setTotalTime"
      @nowPlaying="setNowPlaying"
      @paused="setPaused"
    />
    <header class="quickview-header">
      <p class="has-text-white">
        <nuxt-link to="/" class="has-text-white" @click.native="openMenu = !openMenu">
          UsagiPlayer
        </nuxt-link>
      </p>
      <span class="delete" @click="openMenu = !openMenu" />
    </header>
    <div class="quickview-body">
      <aside class="menu" style="margin-top: 10px; margin-left: 20px">
        <ul class="menu-list">
          <li class="menu-title">
            <p class="is-size-7 has-text-white">
              情報
            </p>
          </li>
          <li v-if="thumbnail && $store.state.user.playerShowThumbnail" style="margin-left:15px; margin-top:10px;">
            <img :src="thumbnail" @click="jumpTo">
          </li>
          <li>
            <div class="navbar-item is-hoverable has-text-white">
              <span class="icon"><Fas i="list" /></span>
              <span @click="jumpTo">
                {{ title }}
              </span>
            </div>
          </li>
          <li>
            <div class="navbar-item is-hoverable has-text-white">
              <span class="icon"><Fas i="history" /></span>
              <span>{{ currentTime }} / {{ totalTime }}</span>
            </div>
          </li>
          <li class="menu-title">
            <p class="is-size-7 has-text-white">
              操作
            </p>
          </li>
          <li>
            <div v-if="isPaused" class="navbar-item is-hoverable has-text-white" @click="$refs.musicPlayer.play()">
              <span class="icon"><Fas i="play" /></span>
              <span>再生する</span>
            </div>
            <div v-else class="navbar-item is-hoverable has-text-white" @click="$refs.musicPlayer.pause()">
              <span class="icon"><Fas i="pause" /></span>
              <span>一時停止する</span>
            </div>
          </li>
          <li>
            <div class="navbar-item is-hoverable has-text-white" @click="$refs.musicPlayer.backward()">
              <span class="icon"><Fas i="step-backward" /></span>
              <span>前の曲へ</span>
            </div>
          </li>
          <li>
            <div class="navbar-item is-hoverable has-text-white" @click="$refs.musicPlayer.forward()">
              <span class="icon"><Fas i="step-forward" /></span>
              <span>次の曲へ</span>
            </div>
          </li>
          <li>
            <div class="navbar-item is-hoverable has-text-white" @click="$refs.musicPlayer.openMenu = true">
              <span class="icon"><Fas i="tools" /></span>
              <span>設定画面を開く</span>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'
import MusicPlayer from '@/components/ui/MusicPlayer.vue'

export default {
  components: {
    Fas,
    MusicPlayer
  },
  props: {
    openMenuFromProp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '読込中',
      thumbnail: '',
      currentTime: '00:00',
      totalTime: '00:00',
      nowPlaying: '#',
      isPaused: false,
      openMenu: false
    }
  },
  watch: {
    openMenuFromProp (value) {
      this.openMenu = value
    },
    openMenu (value) {
      this.$emit('menu-event', value)
    }
  },
  methods: {
    jumpTo () {
      this.$refs.musicPlayer.pause()
      this.isPaused = true
      location.href = this.nowPlaying
    },
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
