<template>
  <div>
    <h1 id="title">{{title}}</h1>

    <Table :columns="columns" :data="users"></Table>
  </div>
</template>

<script>
import UserStore from "../stores/UserStore.js"
import axios from "axios";

var users = []

export default {
  name: 'Users',
  data () {
    return {
      title: "Usuários Cadastrados",
      UserStore: UserStore.data,
      users : this.user,
      columns: [
        {
          title: 'Id',
          key: '_id'
        },
        { 
          title: 'Nome',
          key: 'name'
        },
        {
          title: 'Email',
          key: 'email'
        },
      ]
    }
  },
  methods:{
      
  },
  created(){
    //check current localState is setted
    if(localStorage.name == undefined){
      this.$router.push('/login');
    };
    //retrieve users from server
    axios.defaults.headers.common['x-auth'] = localStorage.token; 
      axios.get("http://localhost:3000/user",'',{'x-auth': localStorage.getItem('token')})
      .then(response => {
      if(response.status == 200){
      this.users = response.data.users;

      }else if(response.status == 401){
        console.log("credentials missed");
        this.$router.push('/logout');
      }
    }).catch(err => {
      console.log(err);
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    margin-bottom: 20px;
    text-align:center;
  }
</style>
