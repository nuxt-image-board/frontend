<template>
  <header>
    <nav class="navbar" :class="{'is-fixed-top': !$store.state.user.useSwipe}">
      <div class="container">
        <div class="navbar-brand">
          <a v-if="!$store.state.user.isLeftHanded" class="navbar-item has-text-white" style="font-weight:bold;" @click="openMenu = !openMenu">
            {{ $t('site_name') }}
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
            {{ $t('site_name') }}
          </a>
        </div>
        <div class="navbar-end is-hidden-touch">
          <div class="navbar-item">
            <button class="button is-primary" @click="openMenu = !openMenu">
              {{ $t('NavbarUp.bar_items.menu') }}
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="quickview" :class="{ 'is-active': openMenu, 'is-left' : $store.state.user.isLeftHanded }">
      <header class="quickview-header">
        <p class="has-text-white">
          <nuxt-link to="/" class="has-text-white" @click.native="openMenu = !openMenu">
            {{ $t('site_name') }}
          </nuxt-link>
        </p>
        <span class="delete" @click="openMenu = !openMenu" />
      </header>
      <div class="quickview-body">
        <aside class="menu" style="margin-top: 10px; margin-left: 20px">
          <ul class="menu-list">
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                {{ $t('NavbarUp.smart_items.home') }}
              </p>
            </li>
            <li>
              <nuxt-link to="/" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="home" /></span>
                <span>{{ $t('NavbarUp.smart_items.top') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/news" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="bell" /></span>
                <span>{{ $t('NavbarUp.smart_items.news') }}</span>
              </nuxt-link>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                {{ $t('NavbarUp.smart_items.arts') }}
              </p>
            </li>
            <li>
              <nuxt-link to="/search/list" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="list" /></span>
                <span>{{ $t('NavbarUp.bar_items.list') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/upload" class="has-text-white navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas i="upload" /></span>
                <span>{{ $t('NavbarUp.bar_items.upload') }}</span>
              </nuxt-link>
            </li>
            <li>
              <a class="has-text-white" @click="openSearch = !openSearch">
                <span class="icon"><Fas i="search" /></span>
                <span>{{ $t('NavbarUp.smart_items.search') }}</span>
                <Fas v-if="!openSearch" i="chevron-down" />
                <Fas v-else i="chevron-up" />
              </a>
              <ul v-if="openSearch">
                <li v-for="item in searchItems" :key="item.icon">
                  <nuxt-link :to="item.to" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                    <span class="icon"><Fas :i="item.icon" /></span>
                    <span>{{ $t('NavbarUp.bar_items.'+item.name) }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                {{ $t('NavbarUp.smart_items.user') }}
              </p>
            </li>
            <li v-for="user in userNavigation" :key="user.name">
              <nuxt-link :to="user.to" class="has-text-white navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon">
                  <Fas :i="user.icon" classes="has-text-white" />
                </span>
                <span>
                  {{ $t('NavbarUp.dropdown_items.'+user.title) }}
                </span>
              </nuxt-link>
            </li>
            <li class="menu-title">
              <p class="is-size-7 has-text-white">
                {{ $t('NavbarUp.smart_items.other') }}
              </p>
            </li>
            <li v-for="item in otherItems" :key="item.icon">
              <nuxt-link :to="item.to" class="navbar-item is-hoverable has-text-white" @click.native="openMenu = !openMenu">
                <span class="icon"><Fas :i="item.icon" /></span>
                <span>{{ $t('NavbarDown.'+item.name) }}</span>
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
import Fas from '@/components/ui/Fas.vue'
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
        { icon: 'users', name: 'character', to: '/list/character' },
        { icon: 'tags', name: 'tag', to: '/list/tag' },
        { icon: 'paint-brush', name: 'artist', to: '/list/artist' },
        { icon: 'keyboard', name: 'keyword', to: '/search_form/keyword' },
        { icon: 'image', name: 'image', to: '/search/image' },
        { icon: 'upload', name: 'uploader', to: '/list/uploader' },
        { icon: 'plus-square', name: 'more_tab', to: '/search/methods' }
      ],
      otherItems: [
        { icon: 'question-circle', name: 'help', to: '/help' },
        { icon: 'sitemap', name: 'links', to: '/links' },
        { icon: 'users', name: 'terms', to: '/terms' },
        { icon: 'pen-fancy', name: 'privacy', to: '/privacy' }
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
