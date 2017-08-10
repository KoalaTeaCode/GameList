import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyBcQ7pCuxkJHgEJzD_yzYyHG34v2snRMXM',
  authDomain: 'boi-db-ios-6b583.firebaseapp.com',
  databaseURL: 'https://boi-db-ios-6b583.firebaseio.com',
  projectId: 'boi-db-ios-6b583',
  storageBucket: 'boi-db-ios-6b583.appspot.com',
  messagingSenderId: '451043099307'
}
firebase.initializeApp(config)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  wantToPlay: [],
  playing: [],
  played: [],
  userList: [],
  user: {},
  firebase
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  register ({ commit, state }, payload) {
    let userAuth = payload.userAuth

    firebase.auth()
    .createUserWithEmailAndPassword(userAuth.email, userAuth.password)
    .then
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      console.log(errorCode, errorMessage)
      // ...
    })
  },
  getUserLists ({ commit, state }) {
    let wantToPlayref = state.firebase.database().ref('game-lists/' + state.user.uid)
    wantToPlayref.on('value', (snapshot) => {
      let array = snapshot.val()
      if (array) state.wantToPlay = array
      snapshot.forEach((item) => {
        let userItem = item.val()
        userItem.key = item.key
        state.userList.push(userItem)
      })
    })

    wantToPlayref.on('child_added', (data) => {
      let userItem = data.val()
      userItem.key = data.key
      state.userList.push(userItem)
    })
  }
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
