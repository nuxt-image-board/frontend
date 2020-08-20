<template>
  <header>
    <nav class="navbar" :class="{'is-fixed-top': !$store.state.user.useSwipe}">
      <div class="container">
        <div class="navbar-brand">
          <a v-if="!$store.state.user.isLeftHanded" class="navbar-item has-text-white" style="font-weight:bold;" @click="openMenu = !openMenu">
            ***REMOVED***
          </a>
          <a
            v-if="!$store.state.user.isLeftHanded && $store.state.user.useMusicPlayer"
            role="button"
            class="navbar-item has-text-white"
            aria-label="menu"
            aria-expanded="false"
            @click="$emit('open-music', true)"
          >
            <Fas i="music" classes="has-text-white" />
          </a>
          <a
            role="button"
            :class="{'left': $store.state.user.isLeftHanded}"
            class="navbar-burger has-text-white"
            aria-label="menu"
            aria-expanded="false"
            @click="openMenu = !openMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
          <a
            v-if="$store.state.user.isLeftHanded && $store.state.user.useMusicPlayer"
            role="button"
            class="navbar-item has-text-white"
            aria-label="menu"
            aria-expanded="false"
            @click="$emit('open-music', true)"
          >
            <Fas i="music" classes="has-text-white" />
          </a>
          <a v-if="$store.state.user.isLeftHanded" class="navbar-item has-text-white" style="font-weight:bold;" @click="openMenu = !openMenu">
            ***REMOVED***
          </a>
        </div>
        <div class="navbar-end is-hidden-touch">
          <div class="navbar-item">
            <button class="button is-primary" @click="openMenu = !openMenu">
              メニュー
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="quickview" :class="{ 'is-active': openMenu, 'is-left' : $store.state.user.isLeftHanded }">
      <header class="quickview-header">
        <p class="has-text-white">
          <nuxt-link to="/" class="has-text-white" @click.native="openMenu = !openMenu">
            ***REMOVED***
          </nuxt-link>
        </p>
        <span class="delete" @click="openMenu = !openMenu" />
      </header>
      <div class="quickview-body">
        <aside class="menu" style="margin-top: 10px; margin-left: 20px">
          <ul class="menu-list">
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                ホーム
              </p>
            </li>
            <li>
              <nuxt-link to="/" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="home" /></span>
                <span>トップ</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/news" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="bell" /></span>
                <span>ニュース</span>
              </nuxt-link>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                イラスト
              </p>
            </li>
            <li>
              <nuxt-link to="/search/list" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="list" /></span>
                <span>一覧</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/upload" class="has-text-white navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="upload" /></span>
                <span>投稿</span>
              </nuxt-link>
            </li>
            <li>
              <a class="has-text-white" @click="openSearch = !openSearch">
                <span class="icon"><Fas i="search" /></span>
                <span>検索</span>
                <Fas v-if="!openSearch" i="chevron-down" />
                <Fas v-else i="chevron-up" />
              </a>
              <ul v-if="openSearch">
                <li v-for="item in searchItems" :key="item.icon">
                  <nuxt-link :to="item.to" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas :i="item.icon" /></span>
                    <span>{{ item.name }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                ユーザー
              </p>
            </li>
            <li v-for="user in userNavigation" :key="user.name">
              <nuxt-link :to="user.to" class="has-text-white navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon">
                  <Fas :i="user.icon" classes="has-text-white" />
                </span>
                <span>
                  {{ user.title }}
                </span>
              </nuxt-link>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                その他
              </p>
            </li>
            <li v-for="item in otherItems" :key="item.icon">
              <nuxt-link :to="item.to" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas :i="item.icon" /></span>
                <span>{{ item.name }}</span>
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

.menu-title {
  margin-top:20px;
  margin-bottom: 5px;
}

.menu-list a:hover {
  background-color: inherit;
}

.navbar-burger.left {
  margin-right: auto;
  margin-left: 0;
}
</style>

<script>
import Fas from '~/components/ui/Fas.vue'
import { userNav } from '~/assets/texts/navigations.json'

export default {
  components: {
    Fas
  },
  props: {
    openMenuFromProp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openMenu: false,
      openSearch: false,
      searchItems: [
        { icon: 'keyboard', name: 'キーワード', to: '/search/keyword?query=' },
        { icon: 'users', name: 'キャラ', to: '/list/character' },
        { icon: 'tags', name: 'タグ', to: '/list/tag' },
        { icon: 'paint-brush', name: '絵師', to: '/list/artist' },
        { icon: 'upload', name: '投稿者', to: '/list/uploader' },
        { icon: 'image', name: '画像', to: '/search/image' }
      ],
      otherItems: [
        { icon: 'question-circle', name: 'ヘルプ', to: '/help' },
        { icon: 'sitemap', name: 'リンク集', to: '/links' },
        { icon: 'users', name: '利用規約', to: '/terms' },
        { icon: 'pen-fancy', name: 'プライバシーポリシー', to: '/privacy' }
      ]
    }
  },
  computed: {
    userNavigation () {
      return userNav.filter((nav) => {
        return !nav.require_product || this.$store.state.user.obtainedProducts.includes(nav.require_product)
      })
    }
  },
  watch: {
    openMenuFromProp (value) {
      this.openMenu = value
    },
    openMenu (value) {
      this.$emit('menu-event', value)
    }
  }
}
</script>
