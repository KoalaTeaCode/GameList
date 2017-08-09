<template lang="pug">
b-modal#game-detail(title="title", size='lg', :hide-header='true')
  h2 {{selectedGame.title}}
  img(v-if='selectedGame.next_page', :src='selectedGame.next_page.image')
  div
    button.btn.btn-primary(@click='wantToPlay()') Want to Play
    button.btn.btn-primary Playing
    button.btn.btn-primary Played
  p
    a(:href='selectedGame.link', target='_blank') Website
  p.info(v-if='selectedGame.next_page') {{selectedGame.next_page.info.join()}}
</template>

<script>
  import bModal from 'bootstrap-vue/lib/components/modal'

  export default {
    props: ['selectedGame'],
    components: {
      bModal
    },
    methods: {
      wantToPlay () {
        console.log('SD')
        this.$store.state.wantToPlay.push(this.selectedGame)
        console.log(this.$store.state.wantToPlay)
      }
    }
  }
</script>

<style scoped>

</style>
