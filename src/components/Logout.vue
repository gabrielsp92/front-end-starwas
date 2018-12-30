<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Logout',
  data () {
    return {
      msg: 'Loged out'
    }
  },
  created(){
      console.log(localStorage);
      if(localStorage.token != undefined){
      //update nav :key to react and reload.
      this.$parent.loggedIn--;
      //redirect to home route
      this.$router.push('/');

        axios.defaults.headers.common['x-auth'] = localStorage.token;
          axios.delete(`http://localhost:3000/user/me/token`,'',{'x-auth': localStorage.getItem('token')})   
                        .then((response) => {
                          if(response.status == 200){
                            this.$Message.success('Logged out!');

                          }else if(response.status == 200){
                              this.$Message.error('Error!');
                          }
                        })
                        .catch(e => {
      
                        });
      }
      
      //Clear Session, 
      localStorage.clear();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
