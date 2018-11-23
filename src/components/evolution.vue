<template>
  <div class="pokemon-evolution">
    <h2>Evolutions</h2>
    <div class="evolution-profile">
      <div :class="claz">
        <p v-if="evolutions.length === 1">This Pokémon does not evolve.</p>
        <!-- <div  > -->
          <div v-for="(pokemons, level) in evolutionsLevels" :class="[`globalLevel-${level}`]">
            <router-link v-for="evolution in pokemons" :to="`/pokemon/${evolution.name}`">
              <div :class="[`level${evolution.level}`]">
                <div class="img-wrapper"><img :src="getPictureUrl(evolution)" class="imgFooter" alt="pokemon"></img></div>
                <h3>{{evolution.name}}<span> #{{evolution.index}}</span></h3>
                <type
                  v-for="type in evolution.types"
                 :key="type.type.name"
                 :typeName="type.type.name"
                 />
                 <span></span>
              </div>
            </router-link>
          </div>
          <!-- <ul>
            <li></li>
          </ul> -->
        <!-- </div> -->
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
        if (this.onlySecondLevel.length === 3) {
          return 'hitmonchan';
        }

        return 'eevee blok';
      }
      else if (this.onlySecondLevel.length === 2) {
        return 'onlyTwoLevel2';
      }
      else if (this.onlySecondLevel.length === 1 && this.onlyThirdLevel.length === 2) {
        return 'oneTwoThird2x';
      }
      else {
        return 'threeEvol';
      }
    },

    evolutionsLevels () {
      return this.evolutions.reduce((acum, pokemon) => {
        const { level } = pokemon;

        if (acum[level]) {
          acum[level].push(pokemon);
        } else {
          acum[level] = [pokemon];
        }

        return acum;
      }, {});
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

<style lang="scss">
.pokemon-evolution {
  background: url('https://assets.pokemon.com/static2/_ui/img/chrome/body_gray_bg.png');
  border-radius: 5px;
  margin-bottom: 50px;
  width: 960px;
  min-height: 330px;

  h2 {
    font-weight: 500;
    color: #fff;
    padding: 15px 20px;
    margin: 0;
  }
}

.evolution-profile {
  // position: relative;
  overflow: auto;

  img {
    box-shadow: 0 4px 4px 0px #212121;
    background-color: #616161;
    border: 5px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    max-width: 150px;
    width: 100%;
  }
  h3 {
    color: #fff;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  span {
    color: #a4acaf;
  }
  .type {
    border-radius: 3px;
    width: 85px;
    height: 20px;
    margin: 0 10px 0 0px;
    display: inline-block;

    p {
      margin: 0 1.5625% 0 0;
      line-height: 18px;
      font-size: 11px;
    }
  }
  .threeEvol {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .globalLevel {

    }
    .globalLevel-2 {
      &::before {
        content: '\f105';
        left: -5%;
        }
    }
    .globalLevel-3 {
      &::before {
        content: '\f105';
        left: -5%;
        }
    }

  }
  .onlyTwoPokemon {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .level1 {
      margin-left: 180px;
    }
    .globalLevel-2 {
      &::before {
        content: '\f105';
        left: 5%;
        }
    }
  }
  .oneTwoThird2x {
    grid-gap: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;

    a:nth-child(1) {
      grid-row: 1 / span 2;
    }
    a:nth-child(2) {
      grid-row: 1 / span 2;
    }
    .level1 {
      margin: 150px 0 0 50px;
    }
    .level2 {
      margin: 150px 0 0 50px;
    }
    .level3 {
      margin: 0 auto;
      padding-top: 10px;
      margin-bottom: 50px;
    }
    .globalLevel-2 {
      &::before {
        content: '\f105';
        left: -5%;
        top: 27%;
        }
    }
    .globalLevel-3 {
      .level3 {
        position: relative;

        &::before {
          content: '\f105';
          position: absolute;
          font-size: 105px;
          color: #fff;
          left: -5%;
          top: 4%;
          }
      }
    }
  }

  .onePokemon p {
    color: #fff;
    margin: 0;
    text-align: left;
    padding-left: 20px;
  }
  .homeless {
    text-align: center;
  }
}


.eevee {
  text-align: center;

  .level1 {
    width: 300px;
    height: 250px;
    margin: 130px 0 0 0px;
    position: relative;
    float: left;
  }
  .level2 {
    padding: 15px 10px;
    float: left;
    display: block;

    img {
      padding: 15px 10px;
      width: 70px;
      height: 70px;
    }
  }
  .globalLevel-1 {
    &::before {
      content: '\f105';
      left: 27%;
      top: 140px;
      }
  }
}

.hitmonchan {
  text-align: center;

  .level1 {
    width: 300px;
    height: 250px;
    margin: 30px 0 50px 0px;
    position: relative;
    float: left;
  }
  .level2 {
    margin-left: 30px;
    margin-top: 30px;
    padding: 15px 10px;
    float: left;
    display: block;

    img {
      padding: 15px 10px;
      width: 90px;
      height: 90px;
    }
  }
  .globalLevel-1 {
    &::before {
      content: '\f105';
      left: 30%;
      top: 40px;
      }
  }

}

.onlyTwoLevel2 {
  text-align: center;
  margin-left: 100px;

  .level1 {
    width: 300px;
    position: relative;
    margin: 150px 0 0px 100px;
    float: left;
    position: relative;
  }
  .level2 {
    padding: 15px 10px;
    float: left;
    width: 250px;
    height: 260px;
    display: block;
  }
  .globalLevel-2 {
    .level2 {
    position: relative;

    &::before {
      content: '\f105';
      position: absolute;
      font-size: 105px;
      color: #fff;
      left: -5%;
      top: 4%;
      }
    }
  }
}

.globalLevel-1,
.globalLevel-2,
.globalLevel-3 {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    font-size: 105px;
    color: #fff;
  }
}
</style>
