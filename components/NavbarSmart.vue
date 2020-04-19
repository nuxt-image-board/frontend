<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item has-text-white" style="font-weight:bold;" @click="openMenu = !openMenu">
            ***REMOVED***
          </a>
        </div>
      </div>
    </nav>
    <div id="quickviewDefault" class="quickview is-left" :class="{ 'is-active': openMenu }">
      <header class="quickview-header">
        <p class="has-text-white">メニュー</p>
        <span class="delete" @click="openMenu = !openMenu" />
      </header>
      <div class="quickview-body">
        <aside class="menu" style="margin-top: 10px; margin-left: 20px">
          <p class="menu-label has-text-light">
            検索
          </p>
          <ul class="menu-list">
            <li>
              <nuxt-link to="/search/list" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="search" /></span>
                <span>一覧から</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/search/keyword" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="keyboard" /></span>
                <span>キーワードから</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/search/image" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="image" /></span>
                <span>画像から</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/list/character" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="user" /></span>
                <span>キャラから</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/list/tag" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="tags" /></span>
                <span>タグから</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/list/artist" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="paint-brush" /></span>
                <span>絵師から</span>
              </nuxt-link>
            </li>
          </ul>
          <p class="menu-label has-text-light">
            ユーザー
          </p>
          <ul class="menu-list">
            <li>
              <nuxt-link to="/profile" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="users" /></span>
                <span>マイページ</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/upload" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="upload" /></span>
                <span>イラスト投稿</span>
              </nuxt-link>
            </li>
          </ul>
          <p class="menu-label has-text-light">
            その他
          </p>
          <ul class="menu-list">
            <li>
              <nuxt-link to="/" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="home" /></span>
                <span>トップ</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/news" class="navbar-item is-hoverable has-text-white" @click="openMenu = !openMenu">
                <span class="icon"><Fas i="bell" /></span>
                <span>お知らせ</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/help" class="is-size-6 has-text-white heading">
                <span class="icon"><Fas i="question-circle" /></span>
                <span>ヘルプ</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/links" class="is-size-6 has-text-white heading">
                <span class="icon"><Fas i="sitemap" /></span>
                <span>リンク集</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/terms" class="is-size-6 link has-text-white heading">
                <span class="icon"><Fas i="users" /></span>
                <span>利用規約</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/privacy" class="is-size-6 has-text-white heading">
                <span class="icon"><Fas i="pen-fancy" /></span>
                <span>プライバシーポリシー</span>
              </nuxt-link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </header>
</template>

<style>
.quickview, .quickview-footer {
    background-color: #7b5544 !important;
}
.quickview-header {
    border-bottom: 1px solid #6d3c32;
}
.quickview-footer {
    border-top: 1px solid #6d3c32;
}
</style>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  props: {
    openMenu: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openSearch: false,
      openMy: false,
      openOther: false
    }
  },
  computed: {
    characters () {
      return this.$store.state.characters.slice(0, 3)
    },
    tags () {
      return this.$store.state.tags.slice(0, 3)
    },
    artists () {
      return this.$store.state.artists.slice(0, 3)
    }
  }
}
</script>
