<template lang="pug">
b-modal#game-detail(title="title", size='lg', :hide-header='true')
  h2 {{selectedGame.title}}
  img(v-if='selectedGame.next_page', :src='selectedGame.next_page.image')
  img(v-if='!selectedGame.next_page && selectedGame.image', :src='selectedGame.image')
  div
    button.btn.btn-primary(@click='update("wantToPlay")') Want to Play
    button.btn.btn-primary(@click='update("playing")') Playing
    button.btn.btn-primary(@click='update("played")') Played
    button.btn.btn-danger(@click='update("remove")') Remove
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
      update (status) {
        let userGameRef = this.$store.state.firebase.database()
          .ref('game-lists/' + this.$store.state.user.uid)
        // this.$store.state.wantToPlay.push(this.selectedGame)

        let firebaseRef = this.selectedGame.firebaseRef
        if (firebaseRef) {
          firebaseRef.status = status

          let updates = {}
          updates[firebaseRef.key] = firebaseRef
          userGameRef.update(updates)

          return
        }

        let newPostRef = userGameRef.push()
        newPostRef.set({
          link: this.selectedGame.link,
          title: this.selectedGame.title,
          image: this.selectedGame.next_page.image,
          status: status
        })
      }
    }
  }
</script>

<style scoped>

</style>
