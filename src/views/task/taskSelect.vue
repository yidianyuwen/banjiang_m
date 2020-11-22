<template>
  <div class="task_select_wrap flex_column">
    <div class="task_inventory_wrap flex_column" style="padding-top: 120px">
      <span class="task_histoy" @click="toHistory">历史记录（最近10次）</span>
      <span class="custom_shadow bg_orange text_white task_inventory" @click="taskInventoryDialogVisible = true">任务盘点</span>
    </div>
    <div style="padding-bottom: 160px">
      <span class="custom_shadow bg_orange text_white difference_analysis" @click="toDifference">差异分析</span>
    </div>

    <el-dialog title="盘点期别" :visible.sync="taskInventoryDialogVisible" width="85%" center>

      <div class="flex_column inventory_options">
        <span class="custom_btn custom_shadow bg_orange text_white mb15" @click="toTaskInventory(1)">半月盘</span>
        <span class="custom_btn custom_shadow bg_orange text_white mb15" @click="toTaskInventory(2)">周盘</span>
        <span class="custom_btn custom_shadow bg_orange text_white mb15" @click="toTaskInventory(3)">日盘</span>
      </div>
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="taskInventoryDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="taskInventoryDialogVisible = false">确 定</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>

<script lang="ts">
/**
 * Data: 2020-10-17
 * Author: Nicky
 * Last Modify:
 */

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import Header from "@/compontent/Header/header.vue";

@Component({
  name: "taskSelect",
  components: {
    Header
  }
})
export default class TaskSelect extends Vue {
  private taskInventoryDialogVisible = false;
  // mounted() {}

  toHistory() {
    this.$router.push({ name: "HistoryRecord", params: {} });
  }

  toTaskInventory(index: number) {
    console.log("index ==>", index);
    this.taskInventoryDialogVisible = false;
    this.$router.push({ name: "TaskInventory", params: { from: "select" } });
  }

  toDifference() {
    this.$router.push({ name: "DifferenceAnalysis", params: {}});
  }

}
</script>

<style scoped lang="scss">
.task_select_wrap {
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .task_inventory,
  .difference_analysis {
    display: block;
    text-align: center;
    margin: 0 70px;
    padding: 20px 0;
    border-radius: 5px;
  }
}

.task_inventory_wrap {
  justify-content: space-between;

  .task_histoy {
    align-self: flex-end;
    border: 1px solid $line_gray;
    border-radius: 4px;
    padding: 10px 25px;
    margin-bottom: 30px;
  }
}

.inventory_options {
  justify-content: center;
}
</style>
