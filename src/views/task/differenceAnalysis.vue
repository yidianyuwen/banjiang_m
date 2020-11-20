<template>
  <div class="difference_wrap flex_column">
    <Header headerTitle="差异分析" />

    <span class="difference_rate">本次差异率： {{ differenceRate }}%</span>

    <el-table :data="differenceData" border style="width: 100%" :header-cell-style="{ 'background-color': '#fafafa' }">
      <el-table-column prop="spName" label="sp名称" align="center"></el-table-column>
      <el-table-column prop="difference" label="差异量（克）" align="center"></el-table-column>
      <el-table-column prop="differenceAmount" label="差异金额" align="center"></el-table-column>
    </el-table>

    <div class="flex_row aline_center option_group">
      <span class="custom_btn custom_shadow bg_orange text_white flex_full" @click="submit()">整改方案提交</span>
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
  private differenceRate = '7.00';
  private differenceData: any = [];

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
      spNo: this.userInfo.spNo
    };
    this.differenceData = [
      {
        spName: "什么都不是",
        difference: "半月盘",
        differenceAmount: ''
      },
      {
        spName: "2016-05-02",
        difference: "周盘",
        differenceAmount: 1000
      },
      {
        date: "2016-05-02",
        period: "日盘",
        differenceAmount: ''
      }
    ];
    getDifferent(posData).then((res: any) => {
      console.log("res", res);
    }).catch((err: any) => {
      console.log('err', err);
    });
  }

  submit() {
    this.$router.push({ name: "RectificationProgram" });
  }
}
</script>

<style scoped lang="scss">
.difference_wrap {
  justify-content: space-between;
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
