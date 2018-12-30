<template>
  <div>
  <h1 id="title">{{ title }}</h1>
    <h2>Nome: {{ user.name }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <h2>id: {{ user.id }}</h2>
  </div>
</template>

<script>

export default {
  name: 'Me',
  data () {
    return {
      title: 'Dados do Usuário',
      user: {
        name: localStorage.name,
        email: localStorage.email,
        id: localStorage.id
      }
    }
  },
  created(){
    if(localStorage.name == undefined){
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    text-align:center;
  }
  #title{
    margin-bottom:20px;
  }
</style>
