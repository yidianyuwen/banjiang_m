<template>
  <div class="flex_column task_inventory_wrap">
    盘点成功
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
  name: "customSuccess",
  components: {}
})
export default class TaskInventory extends Vue {
  // mounted() {}

  submit() {
    console.log("submit");
  }
}
</script>

<style scoped lang="scss"></style>
