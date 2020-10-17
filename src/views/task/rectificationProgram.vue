<template>
  <div class="flex_column rectification_wrap">
    整改方案
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
  name: "rectificationProgram",
  components: {}
})
export default class RectificationProgram extends Vue {
  private status = '';
  // mounted() {}

  confirm() {
    console.log("完成");
    this.$router.push({ name: "TaskSelect", params: {}});
  }
}
</script>

<style scoped lang="scss">
.rectification_wrap {
  justify-content: center;
  align-items: center;
  widows: 100%;
  height: 100%;

}
</style>
