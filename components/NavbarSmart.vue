<template>
  <header>
    <nav class="navbar" :class="{'is-fixed-top': !useSwipe}">
      <div class="container">
        <div class="navbar-brand">
          <a v-if="!isLeftMenu" class="navbar-item has-text-white" style="font-weight:bold;" @click="openMenu = !openMenu">
            ***REMOVED***
          </a>
          <a
            role="button"
            :class="{'left': isLeftMenu}"
            class="navbar-burger has-text-white"
            aria-label="menu"
            aria-expanded="false"
            @click="openMenu = !openMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
          <a v-if="isLeftMenu" class="navbar-item has-text-white" style="font-weight:bold;" @click="openMenu = !openMenu">
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
    <div id="quickviewDefault" class="quickview" :class="{ 'is-active': openMenu, 'is-left' : isLeftMenu }">
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
              <nuxt-link to="/profile" class="has-text-white navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="user" /></span>
                <span>マイページ</span>
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
              <a class="has-text-white" @click="openSearch = !openSearch">
                <span class="icon"><Fas i="search" /></span>
                <span>検索</span>
                <Fas v-if="!openSearch" i="chevron-down" />
                <Fas v-else i="chevron-up" />
              </a>
              <ul v-if="openSearch">
                <li>
                  <nuxt-link to="/search/keyword" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas i="keyboard" /></span>
                    <span>キーワード</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/list/character" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas i="users" /></span>
                    <span>キャラ</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/list/tag" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas i="tags" /></span>
                    <span>タグ</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/list/artist" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas i="paint-brush" /></span>
                    <span>絵師</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/search/image" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas i="image" /></span>
                    <span>画像</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <nuxt-link to="/upload" class="has-text-white navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="upload" /></span>
                <span>投稿</span>
              </nuxt-link>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                その他
              </p>
            </li>
            <li>
              <nuxt-link to="/help" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="question-circle" /></span>
                <span>ヘルプ</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/links" class="is-size-6 has-text-white heading" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="sitemap" /></span>
                <span>リンク集</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/terms" class="is-size-6 link has-text-white heading" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="users" /></span>
                <span>利用規約</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/privacy" class="is-size-6 has-text-white heading" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="pen-fancy" /></span>
                <span>プライバシーポリシー</span>
              </nuxt-link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
    <nav v-if="showBottomNav" class="navbar is-link is-fixed-bottom" role="navigation">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item is-expanded is-block has-text-centered">
          <Fas i="home" classes="fa-lg" />
        </nuxt-link>
        <nuxt-link to="/search" class="navbar-item is-expanded is-block has-text-centered">
          <Fas i="search" classes="fa-lg" />
        </nuxt-link>
        <nuxt-link to="/profile" class="navbar-item is-expanded is-block has-text-centered">
          <Fas i="user" classes="fa-lg" />
        </nuxt-link>
      </div>
    </nav>
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
      openOther: false,
      showBottomNav: false,
      isLeftMenu: this.$cookies.get('isLeftHanded'),
      useSwipe: this.$cookies.get('useSwipe')
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
