<template lang="pug">
div
  games-detail-modal(:selectedGame='selectedGame')
  .container-fluid.banner
    .row
      .col-6.offset-3.text-center
        h1 List
        input.form-control(v-model='search')
  .container.game-container
    .row(v-for='(list, key) in groupedGames')
      h2.col-12 {{key}}
      .col-3(v-for='game in list', @click='showGame(game)')
        .game-column
          .img(v-if='game.next_page', :style='{backgroundImage: `url(${game.next_page.image})`}')
          .img(v-if='!game.next_page && game.image', :style='{backgroundImage: `url(${game.image})`}')
          .desc
            strong {{game.title}}
</template>

<script>
  import groupBy from 'lodash/groupBy'
  import gamesDetailModal from './gamesDetailModal'

  export default {
    props: ['type'],
    components: {
      gamesDetailModal
    },
    data () {
      return {
        search: '',
        games: [],
        selectedGame: {}
      }
    },
    mounted () {
      this.games = this.$store.state.userList
    },
    computed: {
      gamesFiltered () {
        if (!this.search) return this.games
        let filtered = []
        this.games.forEach((game) => {
          if (game.title.toLowerCase().includes(this.search.toLowerCase())) filtered.push(game)
        })

        return filtered
      },
      groupedGames () {
        return groupBy(this.gamesFiltered, 'status')
      }
    },
    methods: {
      showGame (game) {
        this.selectedGame = game
        this.$root.$emit('show::modal', 'game-detail')
      }
    }
  }
</script>

<style scoped>
  .banner {
    background-image: url('https://a.slack-edge.com/d24e/img/apps/home_background@2x.png');
    height: 250px;
    padding: 2em;
    padding-top: 4em;
    color: #fff;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .game-container {
    margin-top: 2em;
  }

  .game-column {
    height: 70px;
    background: #fff;
    text-align: left;
    border-radius: 7px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -webkit-transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    margin-bottom: 1em;
    padding: .6em;
  }

  .img {
    background-size: cover;
    background-position: center;
    height: 50px;
    width: 50px;
    display: inline-block;
    border-radius: 7px 7px 7px 7px;
    vertical-align: bottom;
  }

  .desc {
    display: inline-block;
    /*padding: .5em;*/
    vertical-align: bottom;
    width: 75%;
    font-size: 14px;
    height: 80%;
    overflow: hidden;
    margin-left: .5em;
  }

  .info {
    white-space: pre-line;
  }
</style>
