<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  @import 'assets/styles/scss/reset.scss';

  #app {
    font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text-color;
    box-sizing: border-box;

    .md-input, .md-input::placeholder {
      font-size: 14px;
    }
  }
</style>
