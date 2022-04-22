<template>
  <div class="HomePage">
    <TabPine v-if="!loading" :xmlDom="xmlDom" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TabPine from "@/components/TabPine.vue";
@Component({
  components: {
    TabPine,
  },
})
export default class HomePage extends Vue {
  private link = ""; // Select url for start parse XML
  private xmlDom!: Document;
  private loading = false;

  private async created() {
    let fileData;
    this.loading = true;
    try {
      if (this.link === "") {
        const file = await fetch("static/test.xml");
        fileData = await file.text();
      } else {
        const file = await fetch(new URL(this.link).href);
        fileData = await file.text();
      }

      this.xmlDom = new DOMParser().parseFromString(fileData, "text/xml");
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style></style>
