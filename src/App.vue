<template>
  <div id="app">
    <Stores/>
  </div>
</template>

<script>
  import Stores from './components/Stores'

  export default {
    name: 'App',
    components: {
      Stores,
    },
  }
</script>

<style>
  @import 'assets/reset.scss';

  body {
    font-size: 16px;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 1em;
    margin-top: 60px;
    text-align: center;
  }
</style>
