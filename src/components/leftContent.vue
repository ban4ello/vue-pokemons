<template>
  <div class="left-content">
    <div class="avatar">
      <img :src="picture" class="imgFront" alt="pokemon"></img>
    </div>
    <div class="collectibles-wrapper">
      <div v-for="iconName in arrayIconName" :class="`collectibles-${iconName}`" :key="iconName">
        <a href="#" :title="`Add to My ${iconName}`">
          <span :class="`icon icon_${iconName.toLowerCase()}`"></span>
        </a>
      </div>
    </div>

    <stats :statsInfo="statsInfo"/>
  </div>
</template>

<script>
import stats from './stats_info.vue';

export default {
  components: {
    stats,
  },
  props: {
    pokemonIndex: String,
    statsInfo: Array,
  },

  computed: {
    arrayIconName () {
      return [ 'Collection', 'Wishlist', 'Trade', 'Add' ];
    },
    picture () {
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.pokemonIndex}.png`;
    },
  },
};
</script>

<style lang="scss">

.left-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 460px 55px 215px;
  justify-content: center;
  margin-left: 20px;
}
.avatar {
  background-color: #F2F2F2;
}
.avatar img {
  width: 90%;
  text-align: center;
}
.collectibles-wrapper {
  text-align: center;
  align-self: center;
  width: 90%;
}
.collectibles-wrapper > div {
  display: inline-block;
  padding-right: 20px;
}

</style>
