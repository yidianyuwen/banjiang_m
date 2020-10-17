<template>
  <div class="task_inventory_wrap flex_column">
    <div>任务盘点</div>
  </div>
</template>

<script lang="ts">
/**
 * Data: 2020-10-17
 * Author: Nicky
 * Last Modify:
 */

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "taskInventory",
  components: {}
})
export default class TaskInventory extends Vue {
  // mounted() {}

}
</script>

<style scoped lang="scss">
.task_inventory_wrap {
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
</style>
