<template>

  <div class="nav">
    <nav>
      <div class="nav-wrapper grey darken-3">
        <a class="brand-logo right">Hello {{username}}!</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a class="brand-logo left" @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
  
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'

export default {
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.getUsername()
  },
  methods: {
    logout: function () {
      swal({
        title: 'Are you sure?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes !'
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem('token')
          localStorage.removeItem('id')
          swal(
            'Good Bye!',
            'Logout Success.',
            'success'
          )
          this.$router.push('/')
        }
      })
    },
    getUsername: function (){
      let id = localStorage.getItem('id')
      let self = this

      axios.get(`https://to-do-server.okywiliarso.me/users/get-profile/${id}`)
      .then(response => {
        self.username = response.data.data.username
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
    font-family: 'Alfa Slab One', cursive;
  }
  li {
    margin-left: 10px;
  }
</style>
