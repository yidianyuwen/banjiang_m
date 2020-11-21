<template>
  <div class="container">
    <div class="flex_column task_inventory_wrap">
      <Header headerTitle="任务盘点" />

      <div class="justify_end" style="display: flex; padding: 15px">
        <el-date-picker v-if="from !== 'history'" v-model="inventoryData" type="date" placeholder="选择日期" value-format="yyyyMMdd"></el-date-picker>
        <!--<span v-else class="custom_btn custom_shadow bg_orange text_white" style="width: 70px;" @click="back()">返回</span>-->
      </div>

      <Product ref="product" :info="this.$route.params.info" @productData="getProductData" @countChange="countChange" @submit="submit" />

      <div class="flex_column tips">
        <span class="text_tip mb5">不能出现三个都为空的，需要填入0</span>
        <span class="text_tip mb5">仅当日可修改</span>
        <span class="text_tip mb5">第二日按钮置灰</span>
      </div>

    </div>
    <div class="flex_row aline_center option_group">
      <span class="fz12 flex_full text_center task_count">盘点总金额：{{ countAmount }}元</span>

      <span class="flex_column flex_full" v-if="!this.$route.params.info">
        <span class="fz14 text_center">未盘点： {{ unCount }}项</span>
        <span class="fz14 text_center">已盘点： {{ counted }}项</span>
      </span>

      <span class="custom_btn custom_shadow bg_orange text_white flex_full" style="margin: 0 5px" @click="toValidate()">{{ from === 'history'?'修改':'提交'}}</span>
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
import { inventoryRecord } from "@/api/taskInventory";
import { formateData } from "@/utils/utils";

import Product from "./compontent/product.vue";
import Header from "@/compontent/Header/header.vue";

@Component({
  name: "taskInventory",
  components: {
    Product,
    Header
  }
})
export default class TaskInventory extends Vue {
  private userInfo = JSON.parse(sessionStorage.getItem("userInfo") as string);
  private from = this.$route.params.from || "";
  private inventoryData = "";
  private productCount = [];
  private counted = 0;
  private unCount = 0;
  private countAmount = 0;

  back() {
    this.$router.go(-1);
  }

  mounted(): void {
    console.log("route", this.$route.params.from);
  }

  /* 子组件传回数据 */
  getProductData(data: any) {
    this.unCount = data.length;
    this.countAmount = data[0].inventoryTotalAmt;
  }
  countChange(data: any) {
    // console.log("getMsgFormSon =>",data);
    this.productCount = data;

    this.counted = 0;
    this.countAmount = 0;
    data.map((item: any) => {
      if (item.num1First || item.num1Two || item.num2First || item.num2Two || item.num3First || item.num3Two) {
        this.counted = this.counted + 1;
        this.countAmount = this.countAmount + item.countAmount;
      }
    });
    this.unCount = data.length - this.counted;
  }

  /* 提交录入-表单校验 */
  toValidate() {
    (this.$refs["product"] as any).$emit("bridge", "1");
  }

  /* 提交录入 */
  submit(valid: any) {
    const postData = {
      checkFoodDate: "",
      inventoryFoodsReqList: this.productCount,
      inventoryTotalAmt: this.countAmount,
      shopId: this.userInfo.shopId,
      shopName: this.userInfo.shopName
    };
    if (this.from === "history") {
      postData.checkFoodDate = formateData((this.$route.params.info as any).checkFoodDate);
    } else {
      postData.checkFoodDate = this.inventoryData;
    }

    if (valid) {
      inventoryRecord(postData).then((res: any) => {
        this.$router.push({ name: "CustomSuccess", params: { status: '盘点成功', next: 'TaskSelect'  }});
      }).catch((err: any) => {});
      this.$router.push({ name: "CustomSuccess", params: { status: '盘点成功', next: 'TaskSelect'  }});
    }
  }
}
</script>

<style scoped lang="scss">
.task_inventory_wrap {
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.tips {
  justify-content: flex-end;
  padding: 50px;
  margin-bottom: 90px;
}

.option_group {
  justify-content: center;
  width: 100%;
  height: 60px;
  /*border-top: 1px solid #ccc;*/
  position: absolute;
  padding-top: 10px;
  bottom: 0;
  background-color: $white;

  .task_count {
    border: 1px solid $line_gray;
    padding: 9px 3px;
  }
}
</style>
