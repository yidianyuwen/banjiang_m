<template>
  <div class="difference_wrap flex_column justify_start">
    <Header headerTitle="差异分析" />

    <span class="difference_rate">本次差异率： {{ differenceData[0].diffRate || '' }}</span>

    <el-row class="flex_full">
      <el-table :data="differenceData" border style="width: 100%" :header-cell-style="{ 'background-color': '#fafafa' }">
        <el-table-column prop="shopName" label="sp名称" align="center"></el-table-column>
        <el-table-column prop="diffTotalAmt" label="差异金额" align="center"></el-table-column>
        <el-table-column prop="diffRate" label="差异率" align="center"></el-table-column>
      </el-table>

      <el-pagination
          style="overflow: scroll"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </el-row>

    <div class="flex_row aline_center option_group">
<!--      <span class="custom_btn custom_shadow bg_orange text_white flex_full" @click="submit()">整改方案提交</span>-->
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Data: 2020-10-17
 * Author: Nicky
 * Last Modify:
 */

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { getDifferent } from "@/api/differenceAnalysis.ts";

import Header from "@/compontent/Header/header.vue";

@Component({
  name: "differenceAnalysis",
  components: {
    Header,
  }
})
export default class DifferenceAnalysis extends Vue {
  private userInfo = JSON.parse(sessionStorage.getItem("userInfo") as string);
  private differenceRate = "7.00";
  private differenceData: any = [{ diffRate: "" }];
  private currentPage = 1;
  private pageSize = 10;
  private total = 0;

  mounted() {
    this.getDifferent();
  }

  getDifferent() {
    const posData = {
      startDate: "",
      endDate: "",
      shopId: this.userInfo.shopId,
      shopName: this.userInfo.shopName,
      spName: this.userInfo.spName,
      spNo: this.userInfo.spNo,
      pageSize: this.pageSize,
      pageNo: this.currentPage
    };
    getDifferent(posData).then((res: any) => {
      this.total = res.data.count;
      this.differenceData = res.data.queryTotalDiffRes;
    }).catch((err: any) => {
      console.log('err', err);
    });
  }

  handleCurrentChange(val: any) {
    this.currentPage = val;
    this.getDifferent();
  }

  submit() {
    this.$router.push({ name: "RectificationProgram" });
  }
}
</script>

<style scoped lang="scss">
.difference_wrap {
  width: 100%;
  height: 100%;

  .difference_rate {
    display: block;
    padding: 20px 25px;
    text-align: right;
  }

  .option_group {
    box-sizing: border-box;
    justify-content: center;
    width: 100%;
    height: 60px;
    position: absolute;
    padding: 10px 90px;
    bottom: 0;
    background-color: $white;
  }
}
</style>
