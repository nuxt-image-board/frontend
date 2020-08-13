<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item has-text-white" style="font-weight:bold;" @click.native="closeAll($event)">
            ***REMOVED***
          </nuxt-link>
          <span class="navbar-burger burger has-text-white" :class="{ 'is-active': openMenu }" data-target="navMenu" @click="openMenu = !openMenu">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div id="navMenu" class="navbar-menu" :class="{ 'is-active': openMenu }">
          <div class="navbar-start">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <nuxt-link to="/news" @click.native="closeAll($event)">
                    <span class="icon">
                      <Fas i="bell" classes="has-text-white" />
                    </span>
                  </nuxt-link>
                </p>
              </div>
            </div>
            <div class="navbar-item">
              <form method="get" action="/search/keyword">
                <div class="field has-addons">
                  <div class="control">
                    <input v-model="keyword" name="query" class="input is-rounded" type="text" placeholder="Find an another god-art">
                  </div>
                  <div class="control">
                    <nuxt-link :to="'/search/keyword?query=' + keyword" class="button is-success is-rounded" @click.native="closeAll($event)">
                      <span><Fas i="search" /></span>
                    </nuxt-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="navbar-start" style="flex-grow: 1; justify-content: center;">
            <nuxt-link to="/search/list" class="navbar-item has-text-white" @click.native="closeAll($event)">
              <span class="icon"><Fas i="list" /></span>
              <span>一覧</span>
            </nuxt-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(1)">
                <span class="icon"><Fas i="users" /></span>
                <span>キャラ</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 1}">
                <nuxt-link v-for="chara in characters" :key="chara.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/character/&quot;+chara.id" @click.native="closeAll($event)">
                  {{ chara.name }} <span class="tag is-light">{{ chara.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/character" class="dropdown-item has-text-white" @click.native="closeAll($event)">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(2)">
                <span class="icon"><Fas i="tags" /></span>
                <span>タグ</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 2}">
                <nuxt-link v-for="tag in tags" :key="tag.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/tag/&quot;+tag.id" @click.native="closeAll($event)">
                  {{ tag.name }} <span class="tag is-light">{{ tag.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/tag" class="dropdown-item has-text-white" @click.native="closeAll($event)">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(3)">
                <span class="icon"><Fas i="paint-brush" /></span>
                <span>絵師</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 3}">
                <nuxt-link v-for="artist in artists" :key="artist.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/artist/&quot;+artist.id" @click.native="closeAll($event)">
                  {{ artist.name }} <span class="tag is-light">{{ artist.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/artist" class="dropdown-item has-text-white" @click.native="closeAll($event)">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(4)">
                <span class="icon"><Fas i="upload" /></span>
                <span>投稿者</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 4}">
                <nuxt-link v-for="uploader in uploaders" :key="uploader.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/uploader/&quot;+uploader.id" @click.native="closeAll($event)">
                  {{ uploader.name }} <span class="tag is-light">{{ uploader.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/uploader" class="dropdown-item has-text-white" @click.native="closeAll($event)">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <nuxt-link to="/search/image" class="navbar-item has-text-white" @click.native="closeAll($event)">
              <span class="icon"><Fas i="image" /></span>
              <span>画像</span>
            </nuxt-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(5)">
                <span class="icon"><Fas i="user" /></span>
                <span>{{ $auth.$state.user.name }}</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 5}">
                <nuxt-link v-for="user in userNavigation" :key="user.name" class="dropdown-item has-text-white pl-3" :to="user.to" @click.native="closeAll($event)">
                  <span class="icon">
                    <Fas :i="user.icon" classes="has-text-white" />
                  </span>
                  {{ user.title }}
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link class="dropdown-item has-text-white pl-3" to="/logout" @click.native="closeAll($event)">
                  <Fas i="sign-out-alt" classes="has-text-white" />
                  ログアウト
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'
import { userNav } from '~/assets/texts/navigations.json'

export default {
  components: {
    Fas
  },
  data () {
    return {
      openMenu: false,
      openTab: 0,
      keyword: '',
      hideAllMenu: false
    }
  },
  computed: {
    userNavigation () {
      return userNav.filter((nav) => {
        return !nav.require_product || this.$store.state.user.obtainedProducts.includes(nav.require_product)
      })
    },
    characters () {
      return this.$store.state.characters
    },
    tags () {
      return this.$store.state.tags
    },
    artists () {
      return this.$store.state.artists
    },
    uploaders () {
      return this.$store.state.uploaders
    }
  },
  methods: {
    changeTab (tabNo) {
      if (this.openTab !== tabNo) {
        this.openTab = tabNo
      } else {
        this.openTab = 0
      }
    },
    closeAll (event) {
      this.openTab = 0
      this.openMenu = false
      event.currentTarget.blur()
    }
  }
}
</script>
