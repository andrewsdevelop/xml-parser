<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private mounted() {
    if (!this.$route.name) {
      this.$router.push({ name: "login" });
    }
  }
}
</script>
