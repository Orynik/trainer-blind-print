<template>
  <router-view/>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background: var(--bs-gray-900);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
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
