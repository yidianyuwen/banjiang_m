<template>
  <div class="header_wrap flex_row">
    <div class="back_btn" @click="_back">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="header_tit">{{ headerTitle }}</div>
    <div class="header_right">{{ headerRight }}</div>
  </div>
</template>

<script lang="ts">
  /**
   * Data: 2020-11-21
   * Author: Nicky
   * Last Modify:
   */
  import { Component, Vue, Prop, Watch } from "vue-property-decorator";

  @Component({
    name: "Header",
    components: {}
  })
  export default class CustomSuccess extends Vue {
    private status = this.$route.params.status;
    @Prop() isBack?: any;
    @Prop() headerTitle?: any;
    @Prop() headerRight?: any;

    // mounted() {}

    _back() {
      this.$router.go(-1);
    }
  }
</script>

<style scoped lang="scss">
  .header_wrap {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 50px;
    .back_btn {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }

    .header_tit {
      flex: 1;
      text-align: center;
    }

    .header_right {
      width: 50px;
    }
  }
</style>
