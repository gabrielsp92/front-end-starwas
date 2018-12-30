<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                      <MenuItem name="home" to="/">StarWars</MenuItem>
                    </div>
                    <div class="layout-nav">

                    
                    <div v-if="!logged()">
                        <MenuItem v-for="(route, index) in routes" :key="index" :to="route.path" name="index">
                          <Icon :type="route.icon" />
                          {{route.name}}
                        </MenuItem>
                    </div>
                    <div v-else>
                        <MenuItem v-for="(route, index) in privateRoutes" :key="index" :to="route.path" name="index" >
                          <Icon :type="route.icon" />
                          {{route.name}}
                        </MenuItem>
                    </div>
                      

                        <!-- <router-link v-for="(route, index) in routes" :key="index" :to="route.path" class="menu-btn">{{ route.name }}</router-link> -->
                        <!-- <router-link to="register" class="menu-btn">Register</router-link> -->
                    </div>
                </Menu>
            </Header>
          </Layout>
    </div>
</template>

<script>
    export default {
      name: 'Navbar',
      data () {
      return {
        title: 'Emiolo',
        routes: [{
          name: 'Entrar',
          path: 'login',
          icon: 'ios-log-in'
        },{
          name: 'Cadastrar',
          path: 'register',
          icon: 'ios-contact'
        }],
        privateRoutes: [{
            name: 'Planetas',
            path: 'planets',
            icon: 'ios-planet'
        },{
            name: 'Personagens',
            path: 'characters',
            icon: 'ios-man'
        },{
            name: 'Usuários',
            path: 'users',
            icon: 'ios-people'
        },{
            name: 'Perfil',
            path: 'me',
            icon: 'logo-octocat'
        },{
            name: 'Sair',
            path: 'logout',
            icon: 'md-exit'
        }
        ]}
        },
        methods: {
            logged (){
            if(localStorage.token == undefined){
                return false;
            }
            return true;
        },
        }
    }
</script>

<style scoped>
.menu-btn{
  margin-left:30px;
  color: white;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 50px;
}
img{
  height: 35px;
}
.layout-logo{
float:left
}
.layout-nav{
    width: 600px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
