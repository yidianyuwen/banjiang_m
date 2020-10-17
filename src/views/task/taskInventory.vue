<template>
  <div class="container">
    <div class="flex_column task_inventory_wrap">
      <Product/>

      <div class="flex_column tips">
        <span class="text_tip mb5">不能出现三个都未空的，需要填入0</span>
        <span class="text_tip mb5">仅当日可修改</span>
        <span class="text_tip mb5">第二日按钮置灰</span>
      </div>

    </div>
    <div class="flex_row aline_center option_group">
      <span class="fz12 flex_full text_center task_count">盘点总金额：{{ '***' }}元</span>

      <span class="flex_column flex_full">
        <span class="fz14 text_center">未盘点： **项</span>
        <span class="fz14 text_center">已盘点： **项</span>
      </span>

      <span class="custom_btn custom_shadow bg_orange text_white flex_full" style="margin: 0 5px" @click="submit()">提交</span>
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

import Product from "./compontent/product.vue";

@Component({
  name: "taskInventory",
  components: {
    Product
  }
})
export default class TaskInventory extends Vue {
  // mounted() {}

  submit() {
    console.log('submit');
    this.$router.push({ path: "/customSuccess" });
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
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;

  .task_count {
    border: 1px solid $line_gray;
    padding: 9px 3px;
  }
}
</style>
