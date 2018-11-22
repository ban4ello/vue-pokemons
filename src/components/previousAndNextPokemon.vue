<template>
  <div class="header">
    <div class="pokedex-pokemon-pagination">

      <router-link  :to="`/pokemon/${pokemonPrevios.name}/`" class="previous">
        <div class="pokedex-pokemon-pagination-wrapper">
          <span class="icon icon_arrow_sm_left"></span>
          <span class="pokemon-number">#{{pokemonPrevios.index}} </span>
          <span class="pokemon-name" id="pokemon-name">{{pokemonPrevios.name}}</span>
        </div>
      </router-link >
      <router-link  :to="`/pokemon/${pokemonNext.name}/`" class="next">
        <div class="pokedex-pokemon-pagination-wrapper">
          <span class="icon icon_arrow_sm_right"></span>
          <span class="pokemon-number">#{{pokemonNext.index}} </span>
          <span class="pokemon-name" id="pokemon-name">{{pokemonNext.name}}</span>
        </div>
      </router-link >
    </div>

    <div class="pokedex-pokemon-pagination-title">
      <div class="title-text">
        <span>{{pokemon.name}}</span>
        <span>#{{pokemon.index}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    pokemonPrevios: Object,
    pokemonNext: Object,
  },

};
</script>

<style lang="scss">
.header {
  position: relative;
  padding: 0;
  max-width: 1280px;
  width: 100%;
  height: 110px;
  display: block;
  margin: 0 auto;
}

.previous, .next {
  height: 110px;
  text-align: center;
}

.pokedex-pokemon-pagination {
  a {
   box-sizing: border-box;
   background-color: #a4a4a4;
   cursor: pointer;
   display: block;
   float: left;
   width: 50%;
   color: #fff;
   float: left;
   font-size: 150%;
   line-height: 162.5%;

   &.previous {
    text-decoration: none;
    border-right: 4px solid #fff;

    div {
      float: left;
      padding: 1em 0 4em;
      max-width: 448px;
    }
   }
   &.next>div {
     float: left;
     padding: 1em 0 4em;
     max-width: 448px;
   }
   &:hover {
     background-color: #30a7d7;
   }
   span.icon {
     background-color: #fff;
     border-radius: 20px;
     color: #616161;
     float: left;
     font-size: 65%;
     font-weight: bold;
     height: 26px;
     line-height: 180%;
     margin: 0.5em 4.5em 0;
     text-align: center;
     width: 26px;
   }
 }
 span.pokemon-name {
   color: #616161;
   margin: 0 0.5em;
 }

}

.pokedex-pokemon-pagination-title {
  position: absolute;
  bottom: -20px;
  margin-right: -100%;
  width: 58.0325%;
  margin-left: 20.2%;
  background-color: #fff;

  .title-text {
    margin-left: 100px;
  }
  span {
    float: left;
    font-size: 225%;
    margin-left: 20px;
    margin-top: 0.5em;
    text-align: center;
    text-transform: capitalize;
  }
}

#pokemon-name {
  text-transform: capitalize;
}
.icon_arrow_sm_right:before {
    content: "\f105";
}
.icon_arrow_sm_left:before {
    content: "\f104";
}
</style>
