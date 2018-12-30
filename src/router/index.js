import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Me from '@/components/Me'
import Users from '@/components/Users'
import Logout from '@/components/Logout'
import Planets from '@/components/Planets'
import Characters from '@/components/Characters'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/planets',
      name: 'Planets',
      component: Planets
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    }
  ]
})
