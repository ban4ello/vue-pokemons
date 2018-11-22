import Vue from 'vue';
import {
  getListAllPokemon,
  getPokemons,
  getPokemon,
  getPokemonSpeciesByName,
  getPokemonInfoEvol,
  getEvolution,
} from '../../api/fetch.js';

const GET_POKEMONS = 'pokemonsList/GET_POKEMONS';
const GET_POKEMONS_SUCCESS = 'pokemonsList/GET_POKEMONS_SUCCESS';
const GET_ALLPOKEMON = 'pokemonsList/GET_ALLPOKEMON';
const GET_ADDITIONAL_INFO = 'pokemonsList/GET_ADDITIONAL_INFO';
const GET_EVOLUTION_INFO = 'pokemonsList/GET_EVOLUTION_INFO';

const pokemonsList = {
  state: {
    loading: false,
    showLoader: true,
    currentIndex: 0,
    error: null,
    allPokemons: [],
  },
  mutations: {
    [GET_POKEMONS] (state) {
      state.loading = true;
      state.showLoader = true;
    },
    [GET_POKEMONS_SUCCESS] (state, payload) {
      payload.data.forEach((pokemon) => {
        state.allPokemons = updatePokemon(state.allPokemons, pokemon);
      });

      state.currentIndex = payload.to;
      state.loading = false;
      state.showLoader = false;
    },
    [GET_ADDITIONAL_INFO] (state, payload) {
      state.allPokemons = updatePokemon(state.allPokemons, payload.data);

      state.showLoader = false;
    },
    [GET_EVOLUTION_INFO] (state, payload) {
      payload.data.forEach((pokemon) => {
        state.allPokemons = updatePokemon(state.allPokemons, pokemon);
      });
    },

    [GET_ALLPOKEMON] (state, payload) {
      state.allPokemons = payload.data;
    },
  },
  actions: {
    getAllPokemonsAction (store) {
      return getListAllPokemon()
        .then(data => {
          const list = data.results.map(({ name }, i) => {
            let index = 0;

            if (i < 10) {
              index = '00' + (i + 1);
            } else {
              index = (i < 100) ? '0' + (i + 1) : (i + 1);
            }

            return {
              id: i + 1,
              name,
              index: `${index}`,
            };
          });

          store.commit(GET_ALLPOKEMON, { data: list });
        });
    },

    getPokemonsAction (store, step) {
      const currentIndex = store.state.currentIndex;
      const to = currentIndex + step;

      store.commit(GET_POKEMONS);

      return getPokemons(currentIndex + 1, to)
        .then(pokemonsList => {
          const newData = pokemonsList.map((item) => {
            let index = 0;
            if (item.id < 10) {
              index = '00' + item.id;
            } else {
              index = (item.id < 100) ? '0' + item.id : item.id;
            }

            return {
              abilities: item.abilities,
              height: item.height,
              id: item.id,
              index: `${index}`,
              name: item.name,
              stats: item.stats,
              types: item.types,
              weight: item.weight,
            };
          });

          store.commit(GET_POKEMONS_SUCCESS, { data: newData, to });
          // this.pokemonsSuccessAction({ data: pokemonsList, to });
        });
    },
    getPokemonAction (store, name) {
      return getPokemon(name)
        .then(pokemon => {
          return store.dispatch('updatePokemonAction', pokemon);
        });
    },
    updatePokemonAction (store, pokemon) {
      let index = 0;

      if (pokemon.id < 10) {
        index = '00' + pokemon.id;
      } else {
        index = (pokemon.id < 100) ? '0' + pokemon.id : pokemon.id;
      }

      const newData = {
        abilities: pokemon.abilities,
        height: pokemon.height,
        id: pokemon.id,
        index: `${index}`,
        stats: pokemon.stats,
        types: pokemon.types,
        weight: pokemon.weight,
      };
      store.commit(GET_ADDITIONAL_INFO, { data: newData });
      return pokemon.id;
    },
    getAdditionalAction (store, name) {
      return getPokemonSpeciesByName(name)
        .then(data => {
          let descriptionList = data.flavor_text_entries.map(({ flavor_text, language, version }) => {
            return { text: flavor_text, language: language.name, version: version.name };
          });
          let sortList = descriptionList.filter((elem) => {
            return elem.language === 'en';
          });
          const newData = {
            descriptionList: sortList,
            category: data.genera[2].genus,
            url: data.evolution_chain.url,
            id: data.id,
          };
          store.commit(GET_ADDITIONAL_INFO, { data: newData });
          return newData;
        });
    },
    getEvolutionAction (store, data, name) {
      return getEvolution(data.url)
        .then(evolutions => {
          return getPokemonInfoEvol(evolutions, name)
            .then(pokemonsList => {
              pokemonsList.forEach(pokemon => {
                if (pokemon.id >= 0) {
                  store.dispatch('updatePokemonAction', pokemon);
                }
              });
              const newData = evolutions.map((item) => {
                return {
                  name: item.name,
                  evolution: evolutions,
                };
              });
              store.commit(GET_EVOLUTION_INFO, { data: newData });
            });
        });
    },

  },
  // getters: { ... }
};

export default pokemonsList;

const updatePokemon = (pokemons, newPokemon) => {
  const currentPokemonIndex = pokemons.findIndex(({ id, name }) => id === newPokemon.id || name === newPokemon.name);
  const pokemon = pokemons[currentPokemonIndex];

  if (pokemon) {
    Vue.set(pokemons, currentPokemonIndex, Object.assign({}, pokemon, newPokemon));
  }

  return pokemons;
};
