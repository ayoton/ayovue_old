<script setup lang="ts">
import "ayoflex"
import { useDate } from "../components/useDate"
const date = useDate("")
const addDay = () => {
  date.value.setDate(date.value.getDate() + 1)
}
</script>

<template>
  <div class="playground">
    <div class="playground__left">
      <div class="nav">
        <RouterLink to="/dropdown">Dropdown</RouterLink>
        <RouterLink to="/button">Button</RouterLink>
        <RouterLink to="/input">Input Text</RouterLink>
        <RouterLink to="/select">Select</RouterLink>
        <RouterLink to="/switch">Switch</RouterLink>
      </div>
    </div>
    <div class="playground__right">
      <div class="playground__top"></div>
      <div class="playground__main main">
        <h1>{{ date }}</h1>
        <input type="datetime-local" v-model="date" /><button @click.prevent="addDay">
          add day
        </button>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style>
.playground {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
}
.playground__left {
  width: 222px;
  box-shadow: 0 0 3px 2px rgb(0 0 0 / 5%);
  z-index: 3;
  background-color: #fff;
  padding: 22px;
}
.playground__right {
  flex: 1;
  width: 222px;
  display: flex;
  flex-direction: column;
  z-index: 2;
}
.playground__top {
  box-shadow: 0 0 3px 2px rgb(0 0 0 / 5%);
  height: 55px;
  z-index: 2;
  display: flex;
}
.playground__main {
  flex: 1;
  padding: 22px;
  /* background-color: rgb(54 160 110 / 8%); */
  overflow-y: auto;
}
@media screen and (max-width: 700px) {
  .playground__left {
    display: none;
  }
  .playground__left.responsive {
    /* position: fixed; */
    display: flex;
  }
  .playground__main {
    padding: 10px;
  }
}

/*=============================================*/
.main {
  justify-content: center;
  align-items: center;
}
.main__container {
  display: flex;
  width: 90%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.main__output {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 33px;
}

.main__variations {
  flex: 1;
  padding-left: 22px;
}

.nav {
  display: block;
}

.nav a {
  display: block;
  padding: 3px 11px;
  border-radius: 3px;
  text-decoration: none;
}

.nav a.router-link-active {
  color: #fff;
  background-color: rgb(21, 151, 53);
}
</style>
