<template>
  <div class="flex_column success_wrap">
    <span class="custom_btn custom_shadow bg_green text_black success_btn fz20" @click="confirm()">{{ status || "盘点成功" }}</span>
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
export default class CustomSuccess extends Vue {
  private status = this.$route.params.status;
  // mounted() {}

  confirm() {
    console.log("完成");
    this.$router.push({ name: this.$route.params.next ||  "TaskSelect", params: {}});
  }
}
</script>

<style scoped lang="scss">
.success_wrap {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .success_btn {
    width: 255px;
    height: 255px;
    line-height: 230px;
    border-radius: 255px;
  }
}
</style>
