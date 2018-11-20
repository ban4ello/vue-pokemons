<template>
  <div className="wraper">
    <div className="container pokedex">

      <!-- <PreviousAndNextPokemon
        pokemon={this.state.pokemon}
        pokemonPrevios={this.state.pokemonPrevios}
        pokemonNext={this.state.pokemonNext}
      /> -->

      <div className="section pokedex-pokemon-details">
        <!-- <LeftContent index={this.state.pokemon.index} statsInfo={this.state.pokemon.stats}/>
        <RightContent pokemon={this.state.pokemon} /> -->
      </div>

      <!-- <Evolution evolutions={ this.state.pokemon.evolution } /> -->

    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import {getPokemon, getListAllPokemon, getPokemonSpeciesByName, getEvolution, getPokemonInfoEvol } from '../api/fetch.js';
import type from '../components/type.vue';
// import PreviousAndNextPokemon from '../components/previousAndNextPokemon.vue';
// import RightContent from '../components/rightContent.vue';
// import Evolution from '../components/evolution.vue';
// import LeftContent from '../components/leftContent.vue';

export default {
  name: 'pokemons',
  components: {
    // PreviousAndNextPokemon,
    // RightContent,
    // Evolution,
    // LeftContent,
    type,
  },
  data () {
    return {
      pokemon: {},
      pokemonPrevios: {},
      pokemonNext: {},
    };
  },

  methods: {
    ...mapActions([
      'getAllPokemons',
      'getPokemonsAction',
    ]),

    initComponent () {
      if (this.allPokemons.length === 0) {
        getListAllPokemon()
          .then( data => {
            this.getAllPokemons(data);
            this.fetchAllData();
            if (this.currentIndex !== 0) {
              this.fetchAllData();
            }
          });
      }
    },

    fetchAllData () {
      const pokemon = this.getPokemonFromList();

      if (pokemon) {
        if (!pokemon.descriptionList) {
          this.getDiscriptionPokemon().then((data) => {
            if (!pokemon.evolution) {
              this.evolution(data);
              this.updatePokemon(pokemon);
            }
          });
        }

        this.updatePokemon(pokemon);
      }
      else {
        getPokemon(this.props.match.params.name)
          .then(data => {
            this.getPokemonsAction(data);
            this.getDiscriptionPokemon().then((data) => {
              this.evolution(data);

              const pokemon = this.getPokemonFromList();
              this.updatePokemon(pokemon);
            });

            return data.id;
          });
      }
    },

    evolution (elem) {
      return getEvolution(elem.url)
        .then(data => {
          this.evolutionPokemonList(data);
        });
    },

  },

  computed: {
    getPokemonFromList () {
      return this.allPokemons.find(({ id, stats, name }) => stats && (name === this.props.match.params.name || id === +this.props.match.params.name));
    }

    getDiscriptionPokemon () {
      return getPokemonSpeciesByName(this.props.match.params.name)
        .then(data => {
          return this.getAdditionalAction(data).payload.data;
        });
    }

    evolutionPokemonList (data) {
      return getPokemonInfoEvol(data, this.props.match.params.name)
        .then(pokemonsList => {
          pokemonsList.forEach(pokemon => {
            if (pokemon.id >= 0) {
              this.getPokemonAction(pokemon);
            }
          });
          this.getEvolutionAction(data);
          this.setState({
            evolution: data,
            evolutionList: pokemonsList.map(pokemon => {
              if (pokemon.id >= 0) {
                return pokemon;
              }

              return this.allPokemons.find(({ id, name }) => id >= 0 && name === this.props.match.params.name);
            }),
          });

          return;
        });
    }

    allPokemons () {
      return this.$store.state.pokemonsList.allPokemons;
    },
    currentIndex () {
      return this.$store.state.pokemonsList.currentIndex;
    },
  },

  created () {
    this.initComponent();
  },
};
</script>
