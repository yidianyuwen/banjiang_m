<template>
  <div class="history_record_wrap flex_column">
    <el-table :data="historyRecordData" border style="width: 100%" :header-cell-style="{ 'background-color': '#fafafa' }">
      <el-table-column prop="date" label="盘点时间" align="center"></el-table-column>
      <el-table-column prop="period" label="盘点期别" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
/**
 * Data: 2020-10-17
 * Author: Nicky
 * Last Modify:
 */

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { getHistoryRecord } from "@/api/historyRecord.ts";

@Component({
  name: "historyRecord",
  components: {}
})
export default class HistoryRecord extends Vue {
  private historyRecordData: any = [];

  mounted() {
    this.getHistoryRecord();
  }

  getHistoryRecord() {
    const posData = {
      id: 1
    };
    this.historyRecordData = [
      {
        date: "2016-05-02",
        period: "半月盘"
      },
      {
        date: "2016-05-02",
        period: "周盘"
      },
      {
        date: "2016-05-02",
        period: "日盘"
      }
    ];
    // getHistoryRecord(posData).then((res: any) => {
    //   console.log("res", res);
    // }).catch((err: any) => {
    //   console.log('err', err);
    // });
  }

  toDetail(row: any) {
    console.log("row", row);
    this.$router.push({ name: "TaskInventory", params: { info: row, from: 'select' } });
  }
}
</script>

<style scoped lang="scss">
.history_record_wrap {
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>
