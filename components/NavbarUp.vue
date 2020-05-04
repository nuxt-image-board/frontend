<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item has-text-white" style="font-weight:bold;" @click.native="closeAll()">
            ***REMOVED***
          </nuxt-link>
          <span class="navbar-burger burger has-text-white" :class="{ 'is-active': openMenu }" data-target="navMenu" @click="openMenu = !openMenu">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div id="navMenu" class="navbar-menu" :class="{ 'is-active': openMenu }">
          <div v-if="$store.state.auth.loggedIn" class="navbar-start">
            <div class="navbar-item">
              <div class="field has-addons">
                <div class="control">
                  <input class="input is-rounded" type="text" placeholder="Find an another god-art">
                </div>
                <div class="control">
                  <nuxt-link to="/search/keyword" class="button is-success is-rounded" @click.native="closeAll()">
                    <span><Fas i="search" /></span>
                    <span>検索</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="$store.state.auth.loggedIn" class="navbar-start" style="flex-grow: 1; justify-content: center;">
            <nuxt-link to="/search/list" class="navbar-item is-hoverable has-text-white" @click.native="closeAll()">
              <span class="icon"><Fas i="search" /></span>
              <span>一覧検索</span>
            </nuxt-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(1)">
                <span class="icon"><Fas i="user" /></span>
                <span>キャラ検索</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 1}">
                <nuxt-link v-for="chara in characters" :key="chara.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/character/&quot;+chara.id" @click.native="closeAll()">
                  {{ chara.name }} <span class="tag is-light">{{ chara.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/character" class="navbar-item has-text-white" @click.native="closeAll()">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(2)">
                <span class="icon"><Fas i="tags" /></span>
                <span>タグ検索</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 2}">
                <nuxt-link v-for="tag in tags" :key="tag.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/tag/&quot;+tag.id" @click.native="closeAll()">
                  {{ tag.name }} <span class="tag is-light">{{ tag.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/tag" class="navbar-item has-text-white" @click.native="closeAll()">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(3)">
                <span class="icon"><Fas i="paint-brush" /></span>
                <span>絵師検索</span>
              </a>
              <div class="navbar-dropdown is-boxed has-text-white" :class="{'is-hidden-touch': openTab !== 3}">
                <nuxt-link v-for="artist in artists" :key="artist.name" class="dropdown-item has-text-white pl-3" :to="&quot;/search/artist/&quot;+artist.id" @click.native="closeAll()">
                  {{ artist.name }} <span class="tag is-light">{{ artist.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link to="/list/artist" class="navbar-item has-text-white" @click.native="closeAll()">
                  もっと見る
                </nuxt-link>
              </div>
            </div>
            <nuxt-link to="/search/image" class="navbar-item is-hoverable has-text-white" @click.native="closeAll()">
              <span class="icon"><Fas i="image" /></span>
              <span>画像検索</span>
            </nuxt-link>
          </div>
          <div v-if="$store.state.auth.loggedIn" class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <nuxt-link to="/upload" @click.native="closeAll()">
                    <span class="icon">
                      <Fas i="upload" classes="has-text-white" />
                    </span>
                  </nuxt-link>
                </p>
              </div>
            </div>
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <nuxt-link to="/news" @click.native="closeAll()">
                    <span class="icon">
                      <Fas i="bell" classes="has-text-white" />
                    </span>
                  </nuxt-link>
                </p>
              </div>
            </div>
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <nuxt-link to="/profile" class="button is-outlined" @click.native="closeAll()">
                    <span class="icon"><Fas i="users" /></span>
                    <span>マイページ</span>
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
          <div v-if="!$store.state.auth.loggedIn" class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a href="https://***REMOVED***" class="button is-outlined">
                    <span class="icon">
                      <Fas i="home" />
                    </span>
                    <span>***REMOVED***公式サイト</span>
                  </a>
                </p>
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

export default {
  components: {
    Fas
  },
  data () {
    return {
      openMenu: false,
      openTab: 0
    }
  },
  computed: {
    characters () {
      return this.$store.state.characters
    },
    tags () {
      return this.$store.state.tags
    },
    artists () {
      return this.$store.state.artists
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
    closeAll () {
      this.openTab = 0
      this.openMenu = false
    }
  }
}
</script>
