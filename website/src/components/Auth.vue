<template lang="pug">
div
  .container-fluid.banner
    .row
      .col-6.offset-3.text-center
        h1 Register
  .container.game-container
    .row
      .col-6.offset-3
        label Email
        input.form-control(type='email', v-model='email')
        label Password
        input.form-control(type='password', v-model='password')
        button.btn.btn-primary(@click='register()') Register
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      register (game) {
        this.$store.dispatch('register', {
          userAuth: {
            password: this.password,
            email: this.email
          }
        })
      }
    }
  }
</script>

<style scoped>
  .banner {
    background-image: url('https://a.slack-edge.com/d24e/img/apps/home_background@2x.png');
    height: 100px;
    padding: 2em;
    color: #fff;
    margin-bottom: 1em;
  }
</style>
