<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item has-text-white" style="font-weight:bold;" @click.native="closeAll($event)">
            {{ $t('site_name') }}
          </nuxt-link>
          <span
            class="navbar-burger burger has-text-white"
            :class="{ 'is-active': openMenu }"
            data-target="navMenu"
            @click="openMenu = !openMenu"
          >
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
              <div class="field has-addons">
                <div class="control">
                  <input v-model="keyword" class="input is-rounded" type="text" placeholder="Find an another cute art">
                </div>
                <div class="control">
                  <nuxt-link
                    :to="'/search/keyword/'+keyword"
                    class="button is-success is-rounded"
                    @click.native="closeAll($event)"
                  >
                    <span><Fas i="search" /></span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-start" style="flex-grow: 1; justify-content: center;">
            <nuxt-link to="/search/list" class="navbar-item has-text-white" @click.native="closeAll($event)">
              <span class="icon"><Fas i="list" /></span>
              <span>{{ $t('NavbarUp.bar_items.list') }}</span>
            </nuxt-link>
            <div v-for="(category,index) in searchCategories" :key="category.name" class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(index+1)">
                <span class="icon"><Fas :i="category.icon" /></span>
                <span>{{ $t('NavbarUp.bar_items.'+category.name) }}</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== index+1}">
                <nuxt-link
                  v-for="item in category.items"
                  :key="item.name"
                  :to="'/search/'+category.endpoint+'/'+item.id"
                  class="dropdown-item has-text-white pl-3"
                  @click.native="closeAll($event)"
                >
                  {{ item.name }} <span class="tag is-light">{{ item.count }}</span>
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link :to="'/list/'+category.endpoint" class="dropdown-item has-text-white" @click.native="closeAll($event)">
                  {{ $t('NavbarUp.bar_items.more') }}
                </nuxt-link>
              </div>
            </div>
            <nuxt-link to="/search/image" class="navbar-item has-text-white" @click.native="closeAll($event)">
              <span class="icon"><Fas i="image" /></span>
              <span>{{ $t('NavbarUp.bar_items.image') }}</span>
            </nuxt-link>
            <nuxt-link to="/search/methods" class="navbar-item has-text-white" @click.native="closeAll($event)">
              <span class="icon"><Fas i="plus-square" /></span>
              <span>{{ $t('NavbarUp.bar_items.more') }}</span>
            </nuxt-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-white" @click="changeTab(5)">
                <span class="icon"><Fas i="user" /></span>
                <span>{{ $auth.$state.user.name }}</span>
              </a>
              <div class="navbar-dropdown is-boxed" :class="{'is-hidden-touch': openTab !== 5}">
                <nuxt-link
                  v-for="nav in userNavigation"
                  :key="nav.name"
                  class="dropdown-item has-text-white pl-3"
                  :to="nav.to"
                  @click.native="closeAll($event)"
                >
                  <span class="icon">
                    <Fas :i="nav.icon" classes="has-text-white" />
                  </span>
                  {{ $t('NavbarUp.dropdown_items.'+nav.title) }}
                </nuxt-link>
                <hr class="navbar-divider">
                <nuxt-link class="dropdown-item has-text-white pl-3" to="/logout" @click.native="closeAll($event)">
                  <Fas i="sign-out-alt" classes="has-text-white" />
                  {{ $t('NavbarUp.dropdown_items.logout') }}
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
import Fas from '@/components/ui/Fas.vue'
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
      searchCategories: [
        { icon: 'users', name: 'character', endpoint: 'character', items: this.$store.state.characters },
        { icon: 'tags', name: 'tag', endpoint: 'tag', items: this.$store.state.tags },
        { icon: 'paint-brush', name: 'artist', endpoint: 'artist', items: this.$store.state.artists },
        { icon: 'upload', name: 'uploader', endpoint: 'uploader', items: this.$store.state.uploaders }
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
