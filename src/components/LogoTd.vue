<template>
  <div class="logo-container">
    <img class="logo" :src="validLogoUrl()" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class LogoTd extends Vue {
  @Prop() private logoUrl?: string;

  private validLogoUrl() {
    let url = "";
    try {
      if (this.logoUrl && new URL(this.logoUrl)) {
        url = this.logoUrl;
      }
    } catch (error) {
      url =
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
    return url;
  }
}
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  justify-content: center;
  .logo {
    width: 100px;
    height: 100px;
  }
}
</style>
