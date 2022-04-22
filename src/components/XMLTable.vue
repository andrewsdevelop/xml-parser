<template>
  <table>
    <thead>
      <tr class="main-header">
        <td
          v-for="(mainTitle, mainTitleKey) in mainTitles"
          :key="mainTitleKey"
          :colspan="mainTitle.length"
        >
          <div class="th-content main">
            {{ mainTitle.name }}
          </div>
        </td>
      </tr>
      <tr class="second-header">
        <td v-for="(colName, colIndex) in columnNames" :key="colIndex">
          <div class="th-content">
            {{ parsedColNames(colName) }}
          </div>
        </td>
      </tr>
    </thead>
    <tr class="row" v-for="(row, rowKey) in rows" :key="rowKey">
      <td v-for="(td, tdKey) in row" :key="tdKey">
        <logo-td v-if="isLogo(tdKey)" :logoUrl="td" />
        <div class="td" v-else>
          <div :class="{ 'td-content': true, empty: td === '' || td === 0 }">
            {{ td === "" ? 0 : td }}
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LogoTd from "./LogoTd.vue";
import { colNames } from "@/constants";
import { mainHeaders } from "@/helpers";

@Component({
  components: {
    LogoTd,
  },
})
export default class XMLTable extends Vue {
  @Prop(Array) private rows!: Record<string, string>[];

  private isLogo(value: string) {
    return value.match("logo");
  }

  private mounted() {
    this.mainTitles;
  }

  private get columnNames(): string[] {
    const colNames =
      this.rows.length !== 0 ? Object.keys(this.rows[0]).slice() : [];
    return colNames;
  }

  private get mainTitles() {
    return mainHeaders(this.columnNames);
  }

  private parsedColNames(value: string) {
    return colNames[value] ?? value;
  }
}
</script>

<style scoped lang="scss">
.th-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &.main {
    top: 20px;
    font-weight: bold;
    line-height: 19px;

    color: #322633;
  }
}

table {
  width: 100%;
  border-spacing: 0 20px;
  font-size: 14px;
  padding: 0 20px;

  .row {
    box-shadow: 0px 0px 4px rgba(50, 38, 51, 0.25);
    border-radius: 5px;
  }

  td {
    .td {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px 0;
      .td-content {
        word-break: break-all;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: #800080;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        flex: none;
        order: 0;
        flex-grow: 0;
        width: fit-content;
        &.empty {
          background-color: #bdbdbd;
        }
      }
    }
    &:last-child {
      .td-content {
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        color: #322633;
        width: fit-content;
        &.empty {
          background-color: #bdbdbd;
        }
      }
    }
  }
}
</style>
