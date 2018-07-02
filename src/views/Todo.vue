<template>
  <div>
    <navbar class="nav"></navbar>
    
    <div class="todo-form">
      <h1>Todo list.</h1>
      <p>{{weather.location}}</p>
      <p>{{weather.temperature}}&#x2103; {{weather.skytext}}</p>
      <img :src="weather.url">
      <!-- <p>{{weather.time}}</p> -->
      <hr>
        <input type="text" v-model="newTask" placeholder="Add task" /> &nbsp;
        <button @click="createTask">Add</button>
      
          <div v-if="tasks.length > 0">
            <div v-for="(task, index) in tasks" :key="index">
              <div class="list">
                <div v-if="task.status"><strike><span>{{ task.task }}</span></strike>
                  <i class="far fa-check-circle" id="check" @click="completeTask(task._id)"></i>
                  <i class="far fa-times-circle" id="del" @click="deleteTask(task._id)"></i>
                </div>
                <div v-else><span>{{ task.task }}</span>
                  <i class="far fa-check-circle" id="check" @click="completeTask(task._id, task.task)"></i>
                  <i class="far fa-times-circle" id="del" @click="deleteTask(task._id)"></i>
                </div>
              <hr>
              </div>
            </div>
          </div>      
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import Navbar from '@/components/Navbar'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'todo',
  components: {
    'navbar': Navbar 
  },
  data () {
    return {
      newTask: '',
      weather: ''
    }
  },
  computed: {
    ...mapState([
      'tasks'
    ])
  },
  created () {
    this.getTask()
    this.getWeather()
  },
  methods: {
    ...mapActions([
      'getTask'
    ]),
    emptyTask: function() {
      this.newTask = ''
    },
    createTask: function () {
      this.$store.dispatch('addTask', this.newTask)
      this.emptyTask()
      this.getTask()
      swal(
        'Good job!',
        'Your Task Has been Added!',
        'success'
      )
    },
    completeTask: function (id) {
      let self = this

      axios.put(`https://to-do-server.okywiliarso.me/todos/done/${id}`, {
        status: true
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        self.getTask()
        swal(
          'Done!',
          'Update success',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask: function (id) {
      axios.delete(`https://to-do-server.okywiliarso.me/todos/delete/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.getTask()
      })
      .catch(err => {
        console.log(err)
      })
    },
    getWeather: function () {
      let self = this
      axios.get('https://to-do-server.okywiliarso.me/users/get-weather')
      .then(response => {
        let currentWeather = {
          location: response.data.result[0].location.name,
          temperature: response.data.result[0].current.temperature,
          skytext: response.data.result[0].current.skytext,
          url: response.data.result[0].current.imageUrl,
          time: response.data.result[0].current.observationtime
        }
        self.weather = currentWeather
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .nav {
    margin-bottom: 100px;
    width: 100%;
  }
  .todo {
    max-width: 700px;
    margin-top: 80px;
  }
  .todo-form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 700px;
    margin: 0 auto 100px;
    padding: 100px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .todo-form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 84%;
    border: 0;
    margin: 0 0 30px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .todo-form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #52b8b2;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    width: 65px;
    font-size: 15px;
  }
  .form button:hover,.form button:active,.form button:focus {
    background: #528ab8;
  }
  .list {
    font-family: "Roboto", sans-serif;
    text-align: left;
    margin-top: 20px;
    font-size: 25px;
  }
  #del {
    position: absolute;
    right: 100px;
    color: red;
    cursor: pointer;
  }
  #check {
    position: absolute;
    right: 135px;
    color: green;
    cursor: pointer;
  }
  .todo-form h1 {
    margin-top: -20px;
    margin-bottom: 40px;
    font-size: 5em;
    font-family: 'Alfa Slab One', cursive;
  }
  p {
    font-size: 1em;
    font-family: 'Anton', sans-serif;
  }
  .list {
    font-family: 'Anton', sans-serif;
  }
</style>
