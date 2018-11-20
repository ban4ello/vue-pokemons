import Vue from 'vue';
import Router from 'vue-router';
import pokemons from './views/pokemons.vue';
import pokemonInside from './views/pokemonInside.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: pokemons,
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: pokemons,
    },
    {
      path: '/pokemon/:name',
      name: 'about',
      component: pokemonInside,

      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
  ],
});
