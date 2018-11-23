<template>
  <div class="right-content">
    <div class="discription">
      <span v-if="pokemon.descriptionList">{{pokemon.descriptionList[selectedVersionIndex].text}}</span>
      <span v-else>loading ...</span>
      <div class="versions-menu">
        <span>Version: </span>
        <select v-model="selectedVersionIndex" name="selectBtn1" id="selectBtn1">
          <option v-if="pokemon.descriptionList" v-for="(elem, index) in pokemon.descriptionList" :key="index" :value="index">
            {{elem.version}}
          </option>;
        </select>
      </div>
    </div>

    <div class="version">
    </div>
    <div class="pokemon-ability-info">
      <div class="ability-info-left">
        <ul>
          <li>
            <span class="atribute-title">Height</span>
            <span class="atribute-value">
              {{option.height}}'
            </span>
          </li>
          <li>
            <span class="atribute-title">Weight</span>
            <span class="atribute-value">{{option.weight}} lbs</span>
          </li>
          <li>
            <span class="atribute-title">Gender</span>
            <span class="atribute-value">
              <i class="icon icon_male_symbol"></i>
              <i class="icon icon_female_symbol"></i>
            </span>
          </li>
        </ul>
      </div>
      <div class="ability-info-right">
        <ul>
          <li>
            <span class="atribute-title">Category</span>
            <span class="atribute-value">{{option.category}}</span>
          </li>
          <li v-if="ability">
            <span class="atribute-title">Abilities</span>
            <span class="atribute-value">{{ability.ability.name}}</span>
          </li>
          <!-- <li v-else></li> -->
        </ul>
      </div>
    </div>

    <div class="pokemon-type-info">
      <div class="type-list">
        <div class="type-text">
          <h3>Type</h3>
        </div>
        <type
          v-for="(type, index) in pokemon.types"
         :key="index"
         :typeName="type.type.name"
         />
      </div>
      <!-- <div class="weaknesses">
        <div class="weaknesses-text">
          <h3>Weaknesses</h3>
        </div>
        {this.state.type}
      </div> -->
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
    pokemon: Object,
  },

  data () {
    return {
      selectedVersionIndex: 0,
    };
  },

  computed: {
    option () {
      return {
        weight: ((this.pokemon.weight / 10) * 2.2046).toFixed(1),
        height: this.pokemon.height,
        category: this.pokemon.category,
      }
    },

    ability () {
      return this.pokemon.abilities.find(({ is_hidden }) => !is_hidden);
    },

  },
};
</script>

<style lang="scss">

.right-content .version h3 {
  color: #212121;
  float: left;
  font-size: 112.5%;
  line-height: 150%;
  margin: 1.125em 0 2em;
  font-weight: normal;
}

.discription span {
  color: #212121;
  font-size: 112.5%;
  line-height: 150%;
}
.version {
  display: inline-block;
}
.version-left .icon_pokeball {
  color: #dd2d51;
  font-size: 30px;
}
.version-right .icon_pokeball {
  color: #0072b0;
  font-size: 30px;
}

.version-label {
  border-color: #fff;
  border-style: solid;
  border-width: 4px;
  border-radius: 32px;
  cursor: pointer;
  float: left;
  font-size: 112.5%;
  height: 32px;
  line-height: 32px;
  margin: 0.75em 0 0.75em 0.5em;
  text-align: center;
}

.pokemon-ability-info {
  min-height: 243px;
  border-radius: 10px;
  display: inline-block;
  float: left;
  min-height: 100px;
  position: relative;
  width: 100%;
  background-color: #30a7d7;
  color: #fff;

  .ability-info-left {
    float: left;
    margin-right: -100%;
    width: 49.22%;
    margin-bottom: 20px;
  }
  .ability-info-right {
    float: left;
    margin-right: -100%;
    width: 49.22%;
    margin-left: 50.7825%;
  }
}

.atribute-title {
  clear: both;
  color: #fff;
  float: left;
  font-size: 100%;
  margin: 1.25em 0 0 1.25em;
  text-transform: none;
  white-space: normal;
  word-break: break-word;
}

.atribute-value {
  text-transform: capitalize;
  clear: both;
  color: #212121;
  float: left;
  font-size: 125%;
  margin: 0.75em 0 0 1em;
  white-space: normal;
  word-break: break-word;
}
.pokemon-type-info  {
  border-radius: 10px;
  display: block;
  float: left;
  height: 265px;
  width: 100%;
  color: #fff;

  .type {
    border-radius: 3px;
    width: 140px;
    height: 35px;
    margin: 20px 10px 0 0px;
    line-height: 18px;
    display: inline-block;
    text-align: center;

    p {
      margin: 0;
      padding-top: 8px;
      font-size: 100%;
    }
  }
  .type-text h3 {
    color: #212121;
    width: 100%;
    margin: 0;
    padding-top: 20px;
    font-weight: normal;
    font-size: 125%;
  }
}

.versions-menu {
  width: 110px;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
  margin-top: 10px;
}

</style>
