<template>
  <div>
    <youtube
      ref="youtube"
      style="display:none;"
      width="0px"
      height="0px"
      :player-vars="playerVars"
      @playing="playing"
    />
    <Modal
      title="Usagi Player Config"
      :isModalOpen="openMenu"
      class="has-text-black"
      style="pointer-events: auto;"
      @modal-closed="openMenu = false"
    >
      <table class="table is-fullwidth centered-table">
        <tbody>
          <Setting
            v-for="setting in settings"
            :key="setting.key"
            :storeKey="setting.key"
            :title="setting.title"
            :items="setting.items"
            :placeholder="setting.placeholder"
            :classes="setting.class ? setting.class : ''"
            @openModal="showModal"
            @closeModal="hideModal"
          />
        </tbody>
      </table>
      <Modal
        v-for="setting in settings"
        :key="setting.key"
        :title="setting.title"
        :isModalOpen="setting.flag"
        @modal-closed="hideModal"
      >
        {{ setting.description }}
      </Modal>
      <p class="has-text-centered">
        UsagiPlayerはYoutubeのプレイリストを再生するものです。
        そのため、Youtubeにない動画は再生できません。また、***REMOVED***のサーバー上に音源は一切保管されていません。
        システムを十分ご理解の上、ご利用ください。
      </p>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import Modal from '@/components/ui/Modal.vue'
import Setting from '@/components/page/profile/toggle/setting.vue'

Vue.use(VueYoutube)

export default {
  components: {
    Modal,
    Setting
  },
  data () {
    return {
      youtube: null,
      processId: null,
      isPaused: true,
      openMenu: false,
      currentTimeInSeconds: 0,
      totalTimeInSeconds: 0,
      thumbnail: '',
      title: '読込中',
      nowPlaying: '',
      settings: [
        {
          key: 'playerVolume',
          flag: false,
          class: 'is-info',
          title: '音量',
          description: '再生の音量を設定します',
          items: [
            { text: '10', value: 10 },
            { text: '9', value: 9 },
            { text: '8', value: 8 },
            { text: '7', value: 7 },
            { text: '6', value: 6 },
            { text: '5', value: 5 },
            { text: '4', value: 4 },
            { text: '3', value: 3 },
            { text: '2', value: 2 },
            { text: '1', value: 1 }
          ]
        },
        {
          key: 'playerPlaylist',
          flag: false,
          class: 'is-info',
          title: 'プレイリストID',
          placeholder: 'PL3w4YrAfCCwS2vEqSUXrCKnK-F4-SrYX-',
          description: '再生するプレイリストのIDを指定します。デフォルトではDeyuii氏がまとめている***REMOVED***楽曲プレイリストを指定しています。リミックスリスト、削除された動画を含むプレイリストでは上手く動作しません。'
        },
        {
          key: 'playerRandomPlay',
          flag: false,
          class: 'is-info',
          title: 'ランダム再生',
          description: '有効にすると、プレイリストの中からランダムに再生するようになります。有効な場合、戻っても進んでもランダムになります。この処理は最優先で処理されます。'
        },
        {
          key: 'playerAutoPlay',
          flag: false,
          class: 'is-info',
          title: '自動再生',
          description: '有効にすると、ページを開くと自動で再生されるようになります。スマホでは使えない可能性が高いです。iOSでは動作しません。'
        },
        {
          key: 'playerLoopPlay',
          flag: false,
          class: 'is-info',
          title: 'ループ再生',
          description: '有効にすると、現在再生中の動画を繰り返し再生します。ランダム再生が有効な場合そちらが優先されます。'
        },
        {
          key: 'playerResumePlay',
          flag: false,
          class: 'is-info',
          title: '前回の再生地点から再開',
          description: '有効にすると、前に再生した所から再開するようになります。ランダム再生が有効な場合そちらが優先されます。'
        },
        {
          key: 'playerShowThumbnail',
          flag: false,
          class: 'is-info',
          title: 'サムネイル表示',
          description: '無効にするとサムネイルが消えます。転送量を少しでも減らしたい場合はどうぞ。'
        }
      ],
      playlistData: [],
      playerVars: {
        loop: 1,
        playsinline: 1,
        fs: 0,
        disablekb: 1,
        list: this.$store.state.user.playerPlaylist,
        controls: 0,
        autoplay: this.$store.state.user.playerAutoPlay ? 1 : 0
      },
      firstRun: true,
      apiKey: 'AIzaSyAEf3PvCOAjhKBoF27eWtlZLqJJqKu5X4s'
    }
  },
  computed: {
    currentTime () {
      let minutes = Math.floor(this.currentTimeInSeconds / 60)
      let seconds = this.currentTimeInSeconds - (minutes * 60)
      seconds = seconds < 10 ? '0' + seconds : seconds
      minutes = minutes < 10 ? '0' + minutes : minutes
      return minutes + ':' + seconds
    },
    totalTime () {
      let minutes = Math.floor(this.totalTimeInSeconds / 60)
      let seconds = this.totalTimeInSeconds - (minutes * 60)
      seconds = seconds < 10 ? '0' + seconds : seconds
      minutes = minutes < 10 ? '0' + minutes : minutes
      return minutes + ':' + seconds
    },
    volume () {
      return this.$store.state.user.playerVolume
    }
  },
  watch: {
    volume (newVolume, oldVolume) {
      this.player.setVolume(newVolume * 10)
    }
  },
  mounted () {
    this.player = this.$refs.youtube.player
    this.player.setPlaybackQuality('small')
    this.player.loadPlaylist({ listType: 'playlist', list: this.$store.state.user.playerPlaylist })
    this.player.addEventListener('onStateChange', this.playerStateChanged)
    this.player.setVolume(this.$store.state.user.playerVolume * 10)
    this.player.setLoop(true)
    this.getYoutubeData()
  },
  methods: {
    showModal (modalKey) {
      let modalID = 0
      this.settings.forEach((setting) => {
        if (setting.key === modalKey) {
          this.settings[modalID].flag = true
        }
        modalID += 1
      })
    },
    hideModal () {
      for (let i = 0; i < this.settings.length; i++) {
        this.settings[i].flag = false
      }
    },
    async play () {
      await this.player.playVideo()
      this.isPaused = false
      this.$emit('paused', false)
    },
    async getYoutubeData (nextPageToken = null) {
      const params = {
        playlistId: this.$store.state.user.playerPlaylist,
        key: this.apiKey,
        part: 'snippet,contentDetails',
        fields: 'items(snippet(title,thumbnails.default.url,resourceId.videoId)),nextPageToken',
        maxResults: 50
      }
      if (nextPageToken) {
        params.pageToken = nextPageToken
      }
      const req = this.$axios.create()
      delete req.defaults.headers
      const resp = await req.get('https://www.googleapis.com/youtube/v3/playlistItems', { params })
      this.playlistData = this.playlistData.concat(resp.data.items)
      if (resp.data.nextPageToken) {
        this.getYoutubeData(resp.data.nextPageToken)
      }
    },
    async playing () {
      this.totalTimeInSeconds = Math.round(await this.player.getDuration())
      this.processId = setInterval(() => {
        this.player.getCurrentTime().then((time) => {
          this.currentTimeInSeconds = Math.round(time)
          this.$emit('currentTime', this.currentTime)
          this.$emit('totalTime', this.totalTime)
          this.$store.commit('user/updateSetting', { path: 'playerVideoCurrent', param: Math.round(time) })
        })
      }, 100)
    },
    pause () {
      this.$emit('paused', true)
      this.player.pauseVideo()
      this.isPaused = true
      clearInterval(this.processId)
    },
    async playerStateChanged (event) {
      if (event.data === 0) {
        if (this.$store.state.user.playerLoopPlay) {
          this.player.playVideoAt(this.$store.state.user.playerVideoIndex)
          this.player.setVolume(this.$store.state.user.playerVolume * 10)
        }
      }
      if (event.data === 1) {
        this.player.setVolume(this.$store.state.user.playerVolume * 10)
        this.$emit('paused', false)
        this.isPaused = false
        if (this.firstRun && this.$store.state.user.playerRandomPlay) {
          this.forward()
        }
        if (
          this.firstRun &&
          this.$store.state.user.playerResumePlay &&
          this.$store.state.user.playerVideoIndex &&
          this.$store.state.user.playerVideoCurrent &&
          !this.$store.state.user.playerRandomPlay
        ) {
          this.player.playVideoAt(this.$store.state.user.playerVideoIndex)
          this.player.seekTo(this.$store.state.user.playerVideoCurrent, true)
        }
        this.nowPlaying = await this.player.getVideoUrl()
        const videoID = this.$youtube.getIdFromUrl(await this.player.getVideoUrl())
        const videoInfo = this.playlistData.find(p => p.snippet.resourceId.videoId === videoID)
        this.title = videoInfo.snippet.title
        this.thumbnail = videoInfo.snippet.thumbnails.default.url
        if (!this.firstRun) {
          this.$emit('title', this.title)
          this.$emit('thumbnail', this.thumbnail)
        }
        if (this.firstRun && !this.$store.state.user.playerAutoPlay) {
          this.title = '再生開始待ち'
          this.$emit('title', this.title)
          this.pause()
        }
        this.firstRun = false
      }
    },
    async forward () {
      this.reset()
      let playlistIndex
      let videoInfo
      if (this.$store.state.user.playerRandomPlay) {
        playlistIndex = Math.floor(Math.random() * this.playlistData.length)
        this.player.playVideoAt(playlistIndex)
      } else {
        playlistIndex = await this.player.getPlaylistIndex()
      }
      if (playlistIndex !== this.playlistData.length - 1) {
        this.player.playVideoAt(playlistIndex + 1)
        videoInfo = this.playlistData[playlistIndex + 1]
        this.$store.commit('user/updateSetting', { path: 'playerVideoIndex', param: playlistIndex + 1 })
      } else {
        this.player.playVideoAt(0)
        videoInfo = this.playlistData[0]
        this.$store.commit('user/updateSetting', { path: 'playerVideoIndex', param: 0 })
      }
      this.title = videoInfo.snippet.title
      this.thumbnail = videoInfo.snippet.thumbnails.default.url
      this.nowPlaying = `https://www.youtube.com/watch?list=${this.$store.state.user.playerPlaylist}&v=${videoInfo.snippet.resourceId.videoId}`
      this.$emit('title', this.title)
      this.$emit('thumbnail', this.thumbnail)
      this.$emit('nowPlaying', this.nowPlaying)
      this.$emit('paused', false)
    },
    async backward () {
      this.reset()
      let playlistIndex
      let videoInfo
      if (this.$store.state.user.playerRandomPlay) {
        playlistIndex = Math.floor(Math.random() * this.playlistData.length)
        this.player.playVideoAt(playlistIndex)
      } else {
        playlistIndex = await this.player.getPlaylistIndex()
      }
      if (playlistIndex !== 0) {
        this.player.playVideoAt(playlistIndex - 1)
        videoInfo = this.playlistData[playlistIndex - 1]
        this.$store.commit('user/updateSetting', { path: 'playerVideoIndex', param: playlistIndex - 1 })
      } else {
        this.player.playVideoAt(this.playlistData.length - 1)
        videoInfo = this.playlistData[this.playlistData.length - 1]
        this.$store.commit('user/updateSetting', { path: 'playerVideoIndex', param: this.playlistData.length - 1 })
      }
      this.title = videoInfo.snippet.title
      this.thumbnail = videoInfo.snippet.thumbnails.default.url
      this.nowPlaying = `https://www.youtube.com/watch?list=${this.$store.state.user.playerPlaylist}&v=${videoInfo.snippet.resourceId.videoId}`
      this.$emit('title', this.title)
      this.$emit('thumbnail', this.thumbnail)
      this.$emit('nowPlaying', this.nowPlaying)
      this.$emit('paused', false)
    },
    reset () {
      clearInterval(this.processId)
      this.title = '読込中'
      this.currentTimeInSeconds = 0
      this.totalTimeInSeconds = 0
      this.isPaused = false
      this.$emit('title', this.title)
      this.$emit('currentTime', this.currentTime)
      this.$emit('totalTime', this.totalTime)
    }
  }
}
</script>
