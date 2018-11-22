<template>
  <div class="pokemon-evolution">
    <h2>Evolutions</h2>
    <div class="evolution-profile">
      <div :class="claz">
        <p v-if="evolutions.length === 1">This Pokémon does not evolve.</p>
        <div v-for="evolution in evolutions" :class="[`level${evolution.level}`]">
          <router-link :to="`/pokemon/${evolution.name}`">
            <div>
              <img :src="getPictureUrl(evolution)" class="imgFooter" alt="pokemon"></img>
              <h3>{{evolution.name}}<span> #{{evolution.index}}</span></h3>
              <type
                v-for="type in evolution.types"
               :key="type.type.name"
               :typeName="type.type.name"
               />
            </div>
          </router-link>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import type from './type.vue';

export default {
  components: {
    type,
  },

  props: {
    evolutions: Array,
  },

  methods: {
    getPictureUrl (pokemon) {
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.index}.png`;
    },
  },

  computed: {
    claz () {
      if (this.evolutions.length === 1) {
        return 'onePokemon homeless';
      }
      else if (this.onlySecondLevel.length === 1 && this.onlyThirdLevel.length === 0) {
        return 'onlyTwoPokemon';
      }
      else if (this.onlySecondLevel.length > 2 && this.onlyThirdLevel.length === 0) {
        return 'eevee blok';
      }
      else if (this.onlySecondLevel.length === 2) {
        return 'onlyTwoLevel2';
      }
      else {
        return 'threeEvol';
      }
    },

    onlySecondLevel () {
      return this.evolutions.filter(({level}) => {
        return level === '2';
      });
    },
    onlyThirdLevel () {
      return this.evolutions.filter(({level}) => {
        return level === '3';
      });
    },
  },
}
</script>

<style lang="css">
</style>
