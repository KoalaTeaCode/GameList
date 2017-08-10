<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md">
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class='nav-link' :to="{ name: 'Hello' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class='nav-link' :to="{ name: 'List' }">List</router-link>
          </li>
          <li class="nav-item">
            <router-link class='nav-link' :to="{ name: 'Auth' }">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>
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
