<template>
<div class="card">
   <div class="card-header">
      <p class="card-header-title">
         <nuxt-link style="color: inherit;" :to="artAddress">{{result.name}}</nuxt-link>
      </p>
   </div>
   <div class="card-content">
      <nuxt-link style="color: inherit;" :to="artAddress">
         <nav class="level">
            <div class="level-item has-text-centered">
               <div>
                  <p class="heading">Total Arts</p>
                  <p class="subtitle">{{result.count}}</p>
               </div>
            </div>
            <div class="level-item has-text-centered">
               <div>
                  <p class="heading">Total Likes</p>
                  <p class="subtitle">{{result.lcount}}</p>
               </div>
            </div>
         </nav>
      </nuxt-link>
   </div>
</div>
</template>

<script>
export default {
  props: [
    'result',
    'pageType'
  ],
  data () {
    return {
      artAddress: '/search/' + this.pageType + '?id=' + this.result.id
    }
  }
}
</script>
