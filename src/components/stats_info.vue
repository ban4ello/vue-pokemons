<template>
  <div class="pokemon-stats-info">
    <span class="sumAtribute">
      Sum of all attributes : {{sumOfAllAttributes}}
    </span>
    <div v-for="stat in stats" :key="stat.key" class="first">
      <div class="inside">
        <div class="inside-white" :style="{height: `${stat.correctValue}%`}"></div>
      </div>
      <span>{{stat.key}}</span>
    </div>
  </div>
</template>

<script>
import stats from './stats_info.vue';

export default {

  props: {
    statsInfo: Array,
  },

  computed: {
    arrayIconName () {
      console.log(this.pokemonIndex);
      return [ 'Collection', 'Wishlist', 'Trade', 'Add' ];
    },

    stats () {
      return this.statsInfo.map(({ base_stat: value, stat }) => {
        const max = 200;
        const correctValue = 100 - value * 100 / max;

        return {key: stat.name, correctValue, value};
      }).reverse();
    },

    sumOfAllAttributes () {
      const sumOfValue = this.stats.reduce((acum, {value}) => acum + value, 0);

      return this.statsInfo.length ? (sumOfValue / this.statsInfo.length).toFixed(0) : 0;
    },

  },
};
</script>

<style lang="scss">
.pokemon-stats-info {
  background-color: #a4a4a4;
  border-radius: 10px;
  margin: 1em 0;
  width: 90%;
  margin-left: 20px;
  text-align: center;

  .first {
    display: inline-block;
    width: 60px;
    height: 150px;
    margin: 10px 0 0 5px;
  }
  .inside {
    background: #30a7d7;
    display: inline-block;
    width: 60px;
    height: 120px;
  }
  .inside-white {
    background: #fff;
    width: 60px;
  }
  span {
    font-family: "Roboto",arial,sans-serif;
    font-weight: bold;
    color: #212121;
    float: left;
    font-size: 62.5%;
    width: 100%;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  .sumAtribute {
    font-weight: bold;
    color: #212121;
    float: left;
    font-size: 100%;
    width: 100%;
    padding-left: 20px;
    margin-top: 5px;
    text-align: left;
  }
}

.inside {
  background: #fff;
  width: 60px;
}

</style>
