<template>
    <Row>
        <Col span="8">
        <h1>{{ msg }}</h1>
          <h3 v-for="(planet,index) in planets" :key="index"><a @click="selectPlanet(planet)">{{planet.name}}</a></h3>
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
                <p slot="title">{{currentPlanet.name}}</p>
                <p>Habitantes: {{currentPlanet.population}}</p>
                <p>Terreno: {{currentPlanet.terrain}}</p>
                <p>Gravidade: {{currentPlanet.gravity}}</p>
                <p class="title">Filmes:</p>
                <p v-for="(film,index) in movies" :key="index"> {{film.title}} </p>
             
            </Card>

        </Col>
    </Row>
</template>

<script>
import axios from 'axios';


export default {
  name: 'Planet',
  data () {
    return {
      msg: 'Planetas',
      planets: [],
      nextPage: '',
      previousPage: '',
      currentPlanet: [],
      movies: []
    }
  },
  methods: {
    goToNextPage(){
      axios.get(this.nextPage,{
        headers: null
      })
      .then(response => {
        if(response.status == 200){
          this.planets = response.data.results;
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
      })
      .then(response => {
        if(response.status == 200){
          this.planets = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    selectPlanet(planet){ 
      //set new planet
      this.currentPlanet = planet;
      
      this.setMoviesList();
    },
    setMoviesList() {
       //setting movies
          this.movies = [];
          for (var i = 0; i < this.currentPlanet.films.length; i++){
            //push to movies array
            axios.get(this.currentPlanet.films[i]+"?format=json",{
              headers:null
            })
            .then(response => {
            this.movies.push(response.data);
            })
          }

    }
  },
  created(){
     axios.get("https://swapi.co/api/planets/?format=json",{
          headers: null
        })
      .then(response => {
        if(response.status == 200){
          this.planets = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.currentPlanet= this.planets[0];

          this.setMoviesList();
          
        }
    }).catch(err => {
      console.log(err);
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  text-align:center;
}
.title{
  font-weight:bold;
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
