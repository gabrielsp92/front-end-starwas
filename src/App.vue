<template>
  <div id="app">
    <Navbar :key="loggedIn"></Navbar>
    <router-view/>
  </div>
</template>

<script>
// import Navbar from "./components/Navbar"
import Navbar from "./components/Navbar"

export default {
  name: 'App',
  data() {
    return{
      loggedIn: 0,
    }
  },
  components: {
    Navbar
  },
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center; 
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
