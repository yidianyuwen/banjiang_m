<template>
  <div class="task_select_wrap flex_column">
    <div>任务盘点</div>
  </div>
</template>

<script lang="ts">
/**
 * Data: 2020-10-17
 * auth: Nicky
 * Last Modify:
 */

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "taskSelect",
  components: {}
})
export default class TaskSelect extends Vue {
    
  // mounted() {}

}
</script>

<style scoped lang="scss">
.task_select_wrap {
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
</style>
