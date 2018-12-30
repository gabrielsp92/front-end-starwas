<template>
     <div>

        <Row>
            
            <Col span="8" offset="8">
            <h1 id="title">{{ title }}</h1>
            <div class="content">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                    <FormItem label="Nome" prop="name">
                        <Input type="text" v-model="formCustom.name"></Input>
                    </FormItem>
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
  name: 'Register',
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

            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Por favor, Insira seu nome'));
                }else if (value.length <= 2) {
                        callback(new Error('Por favor, Insira um nome válido'));
                  }
                    callback();
            };

    return {
        title: 'Cadastrar',
        formCustom: {
                    name: '',
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
            name: [
                { validator: validateName, trigger: 'blur' }
            ]}
    }
  },
  methods: {
    handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                      var user = {
                        name: this.formCustom.name,
                        email: this.formCustom.email,
                        password: this.formCustom.passwd
                      };
                        //send request to server with user data.
                        //axios.defaults.headers.common['x-auth'] = response.headers['x-auth'];
                        axios.post(`http://localhost:3000/user`, user,{
                            headers: {
                                'x-auth': localStorage.token
                            }
                        })
                        .then((response) => {
                          if(response.status == 200){
                            //this.$Message.success('Success!');
                            this.$parent.loggedIn++;
                            this.$router.push('/');

                            //setting local storage variables
                            localStorage.setItem('token',response.headers['x-auth']);
                            localStorage.setItem('name',response.data.name);
                            localStorage.setItem('email',response.data.email);
                            localStorage.setItem('id',response.data._id);

                            //axios.defaults.headers.common['x-auth'] = response.headers['x-auth'];

                          }else if(response.status == 401){
                              console.log(response.body);
                              this.$Message.error('Dados invalidos');
                          }
                        })
                        .catch(e => {
      
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
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
