import { getListAllPokemon, getPokemons } from '../../api/fetch.js';

const GET_POKEMONS = 'pokemonsList/GET_POKEMONS';
const GET_POKEMONS_SUCCESS = 'pokemonsList/GET_POKEMONS_SUCCESS';
const GET_ALLPOKEMON = 'pokemonsList/GET_ALLPOKEMON';

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

    [GET_ALLPOKEMON] (state, payload) {
      state.allPokemons = payload.data;
    },
  },
  actions: {
    getAllPokemons (store) {
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
              index: index,
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
              index: index,
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
  },
  // getters: { ... }
};

export default pokemonsList;

const updatePokemon = (pokemons, newPokemon) => {
  const pokemon = pokemons.slice().find(({ id, name }) => id === newPokemon.id || name === newPokemon.name);

  if (pokemon) {
    Object.assign(pokemon, newPokemon);
  }

  return pokemons;
};
