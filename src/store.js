import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: ''
  },
  mutations: {
    pushTask: (state, payload) => {
      state.tasks = payload
    }
  },
  actions: {
    addTask: function (context, payload) {
      axios.post('https://to-do-server.okywiliarso.me/todos/add',{
        task: payload
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        
      })
      .catch(err => {
        console.log(err)
      })
    },
    getTask: function (context) {
      axios.get('https://to-do-server.okywiliarso.me/todos/list', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        let list = response.data.response
        context.commit('pushTask', list)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

})
