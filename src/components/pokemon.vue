<template>
  <div class="pokemon">
    <router-link :to="`/pokemon/${pokemon.name}`">
      <img :src="picture" class="imgFront" alt="pokemon"></img>
    </router-link>

    <div class="collectibles">
      <div v-for="iconName in arrayIconName" :key="iconName">
        <a href="#" :title="`Add to My ${iconName}`">
          <span :class="`icon icon_${iconName.toLowerCase()}`"></span>
        </a>
      </div>
    </div>
    <p class="pokemon-index">#{{pokemon.index}}</p>
    <h2>{{pokemon.name}}</h2>

    <type
      v-for="type in pokemon.types"
     :key="type.type.name"
     :typeName="type.type.name"
     />
  </div>
</template>

<script>
import type from './type.vue';

export default {
  components: {
    type,
  },

  props: {
    pokemon: Object,
  },

  data () {
    return {
      step: 12,
      showBtn: true,
    };
  },

  computed: {

    picture () {
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.pokemon.index}.png`;
    },

    allPokemons () {
      return this.$store.state.pokemonsList.allPokemons;
    },
    arrayIconName () {
      return [ 'Collection', 'Wishlist', 'Trade' ];
    },
  },

};
</script>

<style lang="scss">

.icon {
  font-family: 'icon-fonts';
  color: #616161;
}

a {
  text-decoration: none;
}

.icon_collection:before {
    content: "\f10e";
}
.icon_wishlist:before {
  content: "\f136";
}
.icon_trade:before {
    content: "\f134";
}

.icon_add:before {
  content: "\f101";
}

.icon_collection:before {
    content: "\f10e";
}
.icon_wishlist:before {
  content: "\f136";
}
.icon_trade:before {
    content: "\f134";
}

.icon_add:before {
  content: "\f101";
}
</style>
