<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    // max-width: 600px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
</style>
