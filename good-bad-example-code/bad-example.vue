<template>
  <div class="wraper">

    <div :class="[loaderClass]"></div>

    <div class="pokemons">
      <pokemon
        v-for="pokemon in validPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
        class="pokemon"
      />
    </div>
    <a id="loadMore" :class="[loadMoreButtonClass]">
      <span @click="loadNextPokemon" id="btnLoadNextPokemons" class="button-lightblue">
        {{loadMoreButtonText}}
      </span>
    </a>
    <span id="showScroll"></span>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import pokemon from '@/components/pokemon.vue';

export default {
  name: 'pokemons',
  components: {
    pokemon,
  },
  data () {
    return {
      step: 12,
      showBtn: true,
    };
  },

  methods: {
    ...mapActions([
      'getAllPokemonsAction',
      'getPokemonsAction',
    ]),

    initComponent () {
      if (this.allPokemons.length === 0) {
        return this.getAllPokemonsAction()
          .then(() => {
            if (this.currentIndex === 0) {
              this.loadNextPokemon();
            }
          });
      }

      if (this.currentIndex === 0) {
        this.loadNextPokemon();
      }
    },

    loadNextPokemon () {
      if (this.loading) {
        return;
      }

      this.getPokemonsAction(this.step)
        .then(() => {
          this.showBtn = true;
        });
    },
  },

  computed: {

    loadMoreButtonClass () {
      return `${this.showBtn ? 'show' : ''}`;
    },

    loaderClass () {
      return `${this.showLoader ? 'loader' : ''}`;
    },

    showLoader () {
      return this.$store.state.pokemonsList.showLoader;
    },

    loadMoreButtonText () {
      return this.loading ? 'Loading...' : 'Load more Pokemon';
    },
    loading () {
      return this.$store.state.pokemonsList.loading;
    },
    validPokemon () {
      return this.allPokemons.slice(0, this.currentIndex);
    },
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

<style lang="scss">

.wraper {
  width: 100%;
}

.pokemons {
  background: #fff;
  margin: 0 auto;
  width: 905px;
  display: grid;
  grid-template-rows: 350px;
  grid-template-columns: 205px 205px 205px 205px;
  grid-gap: 15px;
  justify-content: center;
}

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

#loadMore {
  clear: both;
  display: none;
  width: 100%;
  text-align: center;
  padding-top: 65px;

  &.show {
    display: block;
  }

  span {
    display: inline-block;
    margin-left: 50px;
    font-size: 100%;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    line-height: 125%;
    margin: 1.5625%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
  }
}
.button-lightblue {
  background-color: #30a7d7;
  color: #fff;
}

.pokemon:hover {
  animation-duration: .2s;
  animation-name: slidein;
}
@keyframes slidein {
  from {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }

  to {
    transform: matrix(1, 0, 0, 1, 0, 10);
  }
}

.pokemon {
  justify-content: center;
  background: #f5f5f5;
  // will-change: transform;

  .collectibles {
    text-align: center;
    width: 205px;
    height: 30px;

    a {
      display: block;
      width: 30px;
      height: 30px;
    }
    div {
      display: inline-block;
      margin-left: 13px;
    }
  }

  .pokemon-index {
    margin: 0;
    padding-left: 10px;
    color: #919191;
    font-size: 80%;
    font-weight: bold;
  }

  h2 {
    color: #313131;
    font-size: 145%;
    margin: 20px 0 3px 15px;
  }
  h2:first-letter {
    text-transform: uppercase;
  }
}

</style>
