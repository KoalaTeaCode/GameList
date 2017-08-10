<template>
  <div id="app">
    <div>
      <router-link :to="{ name: 'Hello' }">Home</router-link>
      <router-link :to="{ name: 'List', params: {type: 'wantToPlay'} }">Want To Play</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    this.$store.state.firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        this.$store.state.user = user
        this.$store.dispatch('getUserLists')
      } else {
        // User is signed out.
        // ...
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
}
</style>
