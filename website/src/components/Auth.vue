<template lang="pug">
div
  .container.game-container
    .row
      input.form-control(type='email', v-model='email')
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

</style>
