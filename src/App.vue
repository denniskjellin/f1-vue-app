<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/drivers">Drivers</router-link> |
    <router-link to="/meetings">Meetings</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
