<template>
<section class="section">
<div class="container">
    <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
            <figure v-on:click="createModal()" class="has-text-centered">
              <img v-if="!result.nsfw" :src="ImgAddress">
              <img v-else class="blur thumb" :src="ImgAddress">
            </figure>
        </div>
        <div class="column is-12-mobile is-4-tablet is-6-desktop">
            <div class="columns is-centered is-multiline">
                <div class="column is-12 has-text-centered">
                    <p class="title">{{result.title}}</p>
                    <p class="subtitle">{{result.caption}}</p>
                </div>
                <div class="column is-12 has-text-centered">
                    <div class="field is-centered is-multiline">
                        <nuxt-link :to='"/search/character/"+chara[0]' v-for="chara in result.chara" :key="chara[0]"><span class="tag is-primary is-light">{{chara[1]}}</span>&nbsp;</nuxt-link>
                        <nuxt-link :to='"/search/tag/"+tag[0]' v-for="tag in result.tag" :key="tag[1]">
                            <span v-if="!tag[2]"><span class="tag is-info is-light">{{tag[1]}}</span>&nbsp;</span>
                            <span v-else><span class="tag is-danger is-light">{{tag[1]}}</span>&nbsp;</span>
                        </nuxt-link>
                    </div>
                </div>
                <div class="column is-12">
                    <div class="field is-grouped is-grouped-centered is-grouped-multiline">
                        <div class="control">
                            <div class="tags has-addons">
                                <span class="tag">
                                    <i class="fas fa-calendar"></i>
                                </span>
                                <span class="tag is-info">{{result.date}}</span>
                            </div>
                        </div>
                        <div class="control">
                            <div class="tags has-addons">
                                <span class="tag">
                                    <i class="fas fa-heart"></i>
                                </span>
                                <span class="tag is-info">{{result.like}}</span>
                            </div>
                        </div>
                        <div class="control">
                            <div class="tags has-addons">
                                <span class="tag">
                                    <i class="fas fa-bookmark"></i>
                                </span>
                                <!-- 申し訳ないがしばらく固定値で -->
                                <span class="tag is-info">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="field is-grouped is-grouped-centered is-grouped-multiline">
                          <div class="control">
                            <div class="tags has-addons">
                              <span class="tag">
                                <i class="fas fa-pen-fancy"></i>
                              </span>
                                <nuxt-link :to='"/search/artist/"+result.artist.id' class="tag is-link" >{{result.artist.name}}</nuxt-link>
                            </div>
                          </div>
                          <div class="control">
                            <div class="tags has-addons">
                              <span class="tag">
                                <i class="fas fa-user-edit"></i>
                              </span>
                                <!-- 申し訳ないがしばらく固定値で -->
                                <a class="tag is-link" href="#">***REMOVED***収集Bot</a>
                            </div>
                          </div>
                          <div class="control">
                            <div class="tags has-addons">
                              <span class="tag">
                                <i class="fas fa-broadcast-tower"></i>
                              </span>
                                <a class="tag is-link" :href="result.originUrl">{{result.originService}}</a>
                            </div>
                          </div>
                    </div>
                </div>
                <div class="column is-12 has-text-centered">
                    <a @click="addStar()" class="button is-primary is-large">いいね</a>
                    <a @click="toggleBookmark()" class="button is-primary is-large"><i class="fas fa-bookmark"></i></a>
                </div>
                <div class="column is-12 has-text-centered">
                    <a class="button is-large" :href="LineShareAddress">
                        <span class="icon has-text-primary">
                          <i class="fab fa-line fa-2x"></i>
                        </span>
                    </a>
                    <a class="button is-large" :href="TwitterShareAddress">
                        <span class="icon has-text-info">
                          <i class="fab fa-twitter-square fa-2x"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="imageModal" @click='destroyModal()' class="graydisplay"></div>
</section>
</template>

<script>
export default {
  data () {
    return {
      result: {},
      starSound: null,
      bookmarkSound: null
    }
  },
  mounted () {
    this.starSound = new Audio('star.wav')
    this.starSound.load()
    this.bookmarkSound = new Audio('bookmark.wav')
    this.bookmarkSound.load()
  },
  methods: {
    createModal () {
      const modal = document.getElementById('imageModal')
      modal.innerHTML = "<img src='/illusts/orig/" + this.result.illustID + ".webp'>"
      modal.style.display = 'block'
      window.scrollTo({
        top: -200,
        behavior: 'smooth'
      })
    },
    destroyModal () {
      document.getElementById('imageModal').style.display = 'none'
    },
    async addStar () {
      const endpoint = '/arts/' + this.result.illustID + '/likes'
      this.result.like += 1
      await this.$axios.put(endpoint)
      this.starSound.play()
    },

    async toggleBookmark () {
      const endpoint = '/arts/' + this.result.illustID + '/bookmark'
      const response = await this.$axios.post(endpoint)
      console.log(response.data)
      this.bookmarkSound.play()
      alert('まだ未実装です > <')
    }
  },
  computed: {
    ImgAddress () {
      return '/illusts/small/' + this.result.illustID + '.webp'
    },
    TwitterShareAddress () {
      return 'https://twitter.com'
    },
    LineShareAddress () {
      return 'https://line.me'
    }
  },
  async asyncData ({ $axios, route }) {
    const endpoint = '/arts/'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(endpoint + id)
    const data = response.data.data
    return {
      result: data
    }
  },
  async fetch (context) {
    await context.store.dispatch('getNavigationData')
  }
}
</script>

<style>
.blur{
  -ms-filter: blur(20px);
  filter: blur(20px);
}
.thumb{
  max-height: 65vh;
  width: auto;
}
figure{
  display: block;
  text-align:center;
}
.graydisplay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%!important;
  height: 100vh;
  min-height: 100vh;
  background: rgba(0,0,0,0.45);
}
.graydisplay img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 90%;
  max-height: 90%;
  height: auto;
}
</style>
