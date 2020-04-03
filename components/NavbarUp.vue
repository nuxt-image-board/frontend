<template>
    <header>
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <nuxt-link to="/" class="navbar-item has-text-white" style="font-weight:bold;">
                ***REMOVED***
              </nuxt-link>
              <span class="navbar-burger burger has-text-white" v-bind:class="{ 'is-active': openMenu }" v-on:click="openMenu = !openMenu" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navMenu" class="navbar-menu" v-bind:class="{ 'is-active': openMenu }">
              <div class="navbar-start">
                  <div class="navbar-item">
                    <div class="field has-addons">
                      <div class="control">
                        <input class="input is-rounded" type="text" placeholder="Find an another god-art">
                      </div>
                      <div class="control">
                        <nuxt-link to="/search" class="button is-success is-rounded">
                            <span><i class="fas fa-search"></i></span>
                            <span>検索</span>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="navbar-start" style="flex-grow: 1; justify-content: center;">
                  <nuxt-link to="/search/list" class="navbar-item is-hoverable has-text-white">
                      <span class="icon"><i class="fas fa-list"></i></span>
                      <span>一覧から探す</span>
                  </nuxt-link>
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link has-text-white" v-on:click="openChara = !openChara">
                        <span class="icon"><i class="fas fa-user"></i></span>
                        <span>キャラから探す</span>
                    </a>
                    <div class="navbar-dropdown is-boxed" v-bind:class="{'is-hidden-mobile': !openChara}">
                      <nuxt-link class="dropdown-item has-text-white pl-3" v-for="chara in characters"  :key="chara.name" :to='"/search/character/"+chara.id'>
                        {{chara.name}} <span class="tag is-light">{{chara.count}}</span>
                      </nuxt-link>
                      <hr class="navbar-divider">
                      <nuxt-link to="/list/character" class="navbar-item has-text-white">
                        もっと見る
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link has-text-white" v-on:click="openTag = !openTag">
                      <span class="icon"><i class="fas fa-tags"></i></span>
                      <span>タグから探す</span>
                    </a>
                    <div class="navbar-dropdown is-boxed" v-bind:class="{'is-hidden-mobile': !openTag}">
                      <nuxt-link class="dropdown-item has-text-white pl-3" v-for="tag in tags" :key="tag.name" :to='"/search/tag/"+tag.id'>
                        {{tag.name}} <span class="tag is-light">{{tag.count}}</span>
                      </nuxt-link>
                      <hr class="navbar-divider">
                      <nuxt-link to="/list/tag" class="navbar-item has-text-white">
                        もっと見る
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link has-text-white" v-on:click="openArtist = !openArtist">
                      <span class="icon"><i class="fas fa-paint-brush"></i></span>
                      <span>絵師から探す</span>
                    </a>
                    <div class="navbar-dropdown is-boxed has-text-white" v-bind:class="{'is-hidden-mobile': !openArtist}">
                      <nuxt-link class="dropdown-item has-text-white pl-3" v-for="artist in artists" :key="artist.name" :to='"/search/artist/"+artist.id'>
                        {{artist.name}} <span class="tag is-light">{{artist.count}}</span>
                      </nuxt-link>
                      <hr class="navbar-divider">
                      <nuxt-link to="/list/artist" class="navbar-item has-text-white">
                        もっと見る
                      </nuxt-link>
                    </div>
                  </div>
              </div>
              <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                      <p class="control">
                        <nuxt-link to="/profile" class="button is-outlined">
                          <span class="icon">
                            <i class="fas fa-users"></i>
                          </span>
                          <span>マイページ</span>
                        </nuxt-link>
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
export default {
  data () {
    return {
      openMenu: false,
      openChara: false,
      openTag: false,
      openArtist: false
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
  }
}
</script>
