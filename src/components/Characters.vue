<template>
    <Row>
        <Col span="8">
        <h1>{{ msg }}</h1>
          <h3 v-for="(char,index) in characters" :key="index"><a @click="selectCharacter(char)">{{char.name}}</a></h3>
          <ButtonGroup>
                  <Button v-if="previousPage" @click="goToPreviousPage()" size="small" type="default">
                      <Icon type="ios-arrow-back" />
                      Voltar
                  </Button>
                  <Button @click="goToNextPage()" size="small" type="default">
                      Próximo
                      <Icon type="ios-arrow-forward" />
                  </Button>
              </ButtonGroup>
        </Col>
        <Col span="12">
        <Card>
                <p slot="title">{{currentCharacter.name}}</p>
                <p>Sexo: {{currentCharacter.gender}}</p>
                <p>Altura: {{currentCharacter.height}}</p>
                <p class="title">Planeta Natal:</p>
                <p>{{planet}} </p>
                <p class="title">Filmes:</p>
                <p v-for="(film,index) in movies" :key="index"> {{film.title}} </p>
             
            </Card>

        </Col>
    </Row>
</template>

<script>
import axios from 'axios';


export default {
  name: 'Characters',
  data () {

    return {
      msg: 'Personagens',
      characters: [],
      nextPage: '',
      previousPage: '',
      currentCharacter: [],
      movies: [],
      planet: ''
    }
  },
  methods: {
    goToNextPage(){
      axios.get(this.nextPage,{
        headers: null
      })
      .then(response => {
        if(response.status == 200){
          this.characters = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    goToPreviousPage(){

      axios.get(this.previousPage,{
        headers:null
      }).then(response=> {
          this.characters = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
      }).catch(err => {
          console.log(err);
      });
    
    },
    selectCharacter(char){ 
      //set new character
      this.currentCharacter = char;
      this.setCurrentCharacterLists();

    },
    setCurrentCharacterLists() {
        //reset movies
        this.movies = [];
        //run through array
        for (var i = 0; i < this.currentCharacter.films.length; i++){
            //push to movies array
            axios.get(this.currentCharacter.films[i]+"?format=json", {
            headers: null
            })
            .then(response => {
            this.movies.push(response.data);
            })
        }

        axios.get(this.currentCharacter.homeworld+"?format=json", {
            headers: null
            })
            .then(response => {
            this.planet = response.data.name;
            })


    }
  },
  created(){
     axios.get("https://swapi.co/api/people/?format=json",
        {
          headers: null
        }).then(response => {
            console.log(response.data.results);
            this.characters = response.data.results;
            this.currentCharacter = response.data.results[0];
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;

            this.setCurrentCharacterLists();

        }).catch(err => {

        });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    font-weight:bold;
}
*{
  text-align:center;
}
h1{
  margin-bottom:10;
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

}
.sideMenu{
  float:left;
}
</style>
