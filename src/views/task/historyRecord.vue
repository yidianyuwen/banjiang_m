<template>
  <div class="history_record_wrap flex_column">
    <el-table :data="historyRecordData" border style="width: 100%" :header-cell-style="{ 'background-color': '#fafafa' }">
      <el-table-column prop="checkFoodDate" label="盘点时间" align="center"></el-table-column>
      <el-table-column prop="checkFoodType" label="盘点期别" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="mt20"
        style="width: 100%"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total">
    </el-pagination>
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
  private userInfo = JSON.parse(sessionStorage.getItem("userInfo") as string);
  private historyRecordData: any = [];
  private pageSize = 10;
  private currentPage = 1;
  private total = 1;

  mounted() {
    this.getHistoryRecord();
  }

  getHistoryRecord() {
    const posData = {
      pageNo: this.currentPage,
      pageSize: this.pageSize,
      shopId: this.userInfo.shopId,
      shopName: this.userInfo.shopName
    };
    // this.historyRecordData = [
    //   {
    //     date: "2016-05-02",
    //     period: "半月盘"
    //   },
    //   {
    //     date: "2016-05-02",
    //     period: "周盘"
    //   },
    //   {
    //     date: "2016-05-02",
    //     period: "日盘"
    //   }
    // ];
    getHistoryRecord(posData).then((res: any) => {
      console.log("res", res);
      this.historyRecordData = res.data.checkFoodsResList;
      this.total = res.data.checkFoodsResList.length;
    }).catch((err: any) => {
      console.log('err', err);
    });
  }

  toDetail(row: any) {
    console.log("row", row);
    this.$router.push({ name: "TaskInventory", params: { info: row, from: 'history' } });
  }

  handleSizeChange(val: any) {
    console.log(`每页 ${val} 条`);
    this.pageSize = val;
    this.getHistoryRecord();
  }
  handleCurrentChange(val: any) {
    console.log('val', val);
    this.currentPage = val;
    this.getHistoryRecord();
  }
}
</script>

<style scoped lang="scss">
.history_record_wrap {
  justify-content: flex-start;
  width: 100%;
}
</style>
