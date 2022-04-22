<template>
  <div>
    <div class="tab-list">
      <div class="logo" />
      <div
        :class="{ tab: true, active: selectedTab === tabName }"
        v-for="(tabName, tabKey) in tabList"
        :key="tabKey"
        @click="() => onSelectTab(tabName)"
      >
        {{ parsedTabName(tabName) }}
      </div>
    </div>
    <div class="table-wrapper">
      <XMLTable :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getColumnNames, getTabsList } from "@/helpers";
import XMLTable from "./XMLTable.vue";
import { tabs } from "@/constants";

@Component({
  components: {
    XMLTable,
  },
})
export default class TabPine extends Vue {
  @Prop() private xmlDom!: Document;

  private tabList: string[] = [];
  private selectedTab!: string;
  private rows: Record<string, string>[] = [];

  private mounted() {
    this.tabList = getTabsList(this.xmlDom);
    this.rows = getColumnNames(this.xmlDom, this.tabList[0]);
    this.selectedTab = this.tabList[0];
  }

  private onSelectTab(value: string) {
    this.selectedTab = value;
    this.rows = getColumnNames(this.xmlDom, value);
  }

  private isSelected(value: string): boolean {
    return this.selectedTab === value;
  }
  private parsedTabName(value: string) {
    return tabs[value] || value;
  }
}
</script>

<style scoped lang="scss">
.tab-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22px 20px;
  box-shadow: 0px 1px 2px 0px #32263340;

  .logo {
    width: 100px;
    height: 23.51px;
    background-image: url("@/assets/icons/logo.svg");
    margin-right: 30px;
  }
  .tab {
    padding-right: 20px;
    font-weight: bolder;
    &.active {
      font-weight: bold;
      color: #800080;
    }
  }
}
.temp {
  background-image: url("https://www.svgrepo.com/show/303132/coca-cola-logo.svg");
}
</style>
