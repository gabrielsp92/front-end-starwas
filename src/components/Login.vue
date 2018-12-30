<template>
    <div span="8" offset="8">
        
        <Row>
            <Col span="8" offset="8">
            <h1 id="title">{{title}}</h1>
            <div class="content">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                    <FormItem label="Email" prop="email">
                        <Input type="email" v-model="formCustom.email"></Input>
                    </FormItem>
                    <FormItem label="Senha" prop="passwd">
                        <Input type="password" v-model="formCustom.passwd"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" id="btn1" @click="handleSubmit('formCustom')">Enviar</Button>
                        <Button @click="handleReset('formCustom')" id="btn2" style="margin-left: 8px">Cancelar</Button>
                    </FormItem>
                </Form>
            </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Por favor, digite sua senha'));
                } 
                    callback();  
            };
            
            const validEmail= function (email) {
                  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(email);
            };

            const validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Por favor, Insira um email'));
                } 
                setTimeout(() => {
                    if (!validEmail(value)) {
                        callback(new Error('Por favor, Insira um email válido'));
                    }
                    callback();
                }, 1000);
            };
            
            return {
                title: 'Entrar',
                formCustom: {
                    passwd: '',
                    email: '',
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                      var user = {
                        email: this.formCustom.email,
                        password: this.formCustom.passwd
                      };
                        //send request to server with user data.
                        axios.post(`http://localhost:3000/user/login`, user)
                        .then((response) => {
                          if(response.status == 200){
                            //this.$Message.success('Success!');
                            this.reloadNav();
                            this.$router.push('/');

                            //setting local storage variables
                            localStorage.setItem('token',response.headers['x-auth']);
                            localStorage.setItem('name',response.data.name);
                            localStorage.setItem('email',response.data.email);
                            localStorage.setItem('id',response.data._id);

                            axios.defaults.headers.common['x-auth'] = response.headers['x-auth'];

                          }else if(response.status == 401){
                              setTimeout(()=>{
                                this.$Message.error('Email ou senha invalidos!');
                              } ,1000)
                              
                          }
                        })
                        .catch(e => {
      
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            reloadNav() {
                this.$parent.loggedIn = 1;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title{
    margin-bottom: 20px;
    margin-left: 100px;
    text-align: none;
}
.content{
  width: 270px;
}
#btn1,#btn2{
  float:left;
}

</style>
