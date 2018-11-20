<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/pokemons"></router-link>
      <router-link to="/pokemon/:name"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: #fff url(./assets/container_bg.png);
}
.wraper {
  width: 100%;
}

#app {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "FontAwesome", "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
