<template>
  <div class="container">
    <Header headerTitle="整改方案" />
    <div class="flex_column rectification_wrap">
      <span class="rectification_tit fz28 fw_bold">整改方案提交</span>

      <el-input type="textarea" :autosize="{ minRows: 20}" placeholder="请输入内容" style="flex: 1" v-model="rectificationProgram" />
    </div>

    <div class="flex_row aline_center option_group">
      <span class="custom_btn custom_shadow bg_orange text_white flex_full" @click="submit()">确认提交</span>
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

import Header from "@/compontent/Header/header.vue";

@Component({
  name: "rectificationProgram",
  components: {
    Header
  }
})
export default class RectificationProgram extends Vue {
  private status = '';
  private rectificationProgram = '';
  // mounted() {}

  submit() {
    this.$router.push({ name: "CustomSuccess", params: { status: '提交成功', next: 'DifferenceAnalysis'  }});
  }
}
</script>

<style scoped lang="scss">
.rectification_wrap {
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 40px;

  .rectification_tit {
    display: block;
    height: 120px;
    line-height: 120px;
  }
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
</style>
