<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Node.js, MongoDB, e Vue.js',
      author: 'Gabriel Soares',
      title: 'Starwars wiki App'
    }
  },
  mounted(){
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  text-align:center;
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
</style>
