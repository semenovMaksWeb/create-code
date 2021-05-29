<template>
  <div id="nav">
    <router-link to="/">Главная</router-link>
    <router-link to="/interface">Создание интерфейсов</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 5px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.container{
  max-width: 1170px;
  width: 100%;
  margin:  0 auto;
}
</style>
