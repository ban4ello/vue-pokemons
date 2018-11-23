<template>
  <div class="wraper">
    <div class="container-pokedex">
      <div :class="[loaderClass]"></div>

      <PreviousAndNextPokemon
        v-if="pokemon"
        :pokemon="pokemon"
        :pokemonPrevios="pokemonPrevios"
        :pokemonNext="pokemonNext"
      />

      <div class="section pokedex-pokemon-details">
        <LeftContent
          v-if="pokemon"
          :pokemonIndex="pokemon.index"
          :statsInfo="pokemon.stats"
        />
        <RightContent v-if="pokemon" :pokemon="pokemon" />
      </div>

      <Evolution
        v-if="evolutionsFullData.length"
        :evolutions="evolutionsFullData"
      />

    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import {
  getPokemon,
  getListAllPokemon,
  getEvolution,
  getPokemonInfoEvol,
 } from '../api/fetch.js';
import PreviousAndNextPokemon from '../components/previousAndNextPokemon.vue';
import RightContent from '../components/rightContent.vue';
import Evolution from '../components/evolution.vue';
import LeftContent from '../components/leftContent.vue';

export default {
  name: 'pokemons',
  components: {
    PreviousAndNextPokemon,
    RightContent,
    Evolution,
    LeftContent,
  },
  data () {
    return {
      // pokemonState: {},
      // pokemonPrevios: {},
      // pokemonNext: {},
    };
  },

  methods: {
    ...mapActions([
      'getAllPokemonsAction',
      'getPokemonAction',
      'getAdditionalAction',
      'getEvolutionAction',
    ]),

    initComponent () {
      if (this.allPokemons.length === 0) {
        return this.getAllPokemonsAction()
          .then(() => this.fetchAllData());
      }

      return this.fetchAllData();
    },

    fetchAllData () {
      if (this.pokemon) {
        if (!this.pokemon.descriptionList) {
          return this.getAdditionalAction(this.$route.params.name).then((data) => {
            if (!this.pokemon.evolution) {
              this.getEvolutionAction(data, this.$route.params.name);
            }
          });
        }
      }
      else {
        return this.getPokemonAction(this.$route.params.name)
          .then(() => this.getAdditionalAction(this.$route.params.name)
            .then((data) => this.getEvolutionAction(data, this.$route.params.name)));
      }
    },
  },

  computed: {
    allPokemons () {
      return this.$store.state.pokemonsList.allPokemons;
    },
    pokemon () {
      return this.allPokemons.find(({ id, stats, name }) => stats
        && (name === this.$route.params.name || id === +this.$route.params.name));
    },

    pokemonEvolutions () {
      return (this.pokemon && this.pokemon.evolution) || []
    },

    evolutionsFullData () {
      return this.pokemonEvolutions.map((evolution) => Object.assign(
        {},
        (this.allPokemons.find(({name}) => name === evolution.name) || {}),
        { level: evolution.level }
      ));
    },

    pokemonPrevios () {
      const prevId = this.pokemon.id < 2 ? this.pokemonsLength - 1 : this.pokemon.id - 2;
      return this.allPokemons[prevId];
    },
    pokemonNext () {
      const nextId = this.pokemon.id >= this.pokemonsLength ? 0 : this.pokemon.id;
      return this.allPokemons[nextId];
    },
    pokemonsLength () {
      return this.allPokemons.length;
    },
    currentIndex () {
      return this.$store.state.pokemonsList.currentIndex;
    },
    loaderClass () {
      return `${this.showLoader ? 'loader' : ''}`;
    },
    showLoader () {
      return this.$store.state.pokemonsList.showLoader;
    },
  },

  watch: {
    '$route': 'initComponent',
  },

  created () {
    this.initComponent();
  }
};
</script>

<style lang="scss">
.loader {
  border: 16px solid #bebebe;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin .2s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
  ul {
    list-style: none;
    margin: 0;
  }

  .icon {
    font-family: 'icon-fonts';
  }

  .icon_male_symbol:before {
    content: "\f122";
  }
  .icon_female_symbol:before {
    content: "\f115";
  }
  .icon_pokeball:before {
    content: "\f12a";
  }
  .icon_arrow_sm_left:before {
      content: "\f104";
  }
  .icon_arrow_sm_right:before {
      content: "\f105";
  }
  .wraper {
    box-sizing: border-box;
    clear: both;
    display: block;
    margin: 0 auto;
    max-width: 1280px;
    overflow: hidden;
    position: relative;
    background: #fff;
  }
  .container-pokedex {
    background: #fff;
    margin: 0 auto;
    width: 980px;
  }

  .pokedex-pokemon-details {
    margin-top: 85px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 755px;
    grid-gap: 20px;
  }
</style>
