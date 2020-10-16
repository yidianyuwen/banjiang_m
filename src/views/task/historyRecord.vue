<template>
  <div class="history_record_wrap flex_column">
    历史记录
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
  name: "historyRecord",
  components: {}
})
export default class HistoryRecord extends Vue {
  // mounted() {}

}
</script>

<style scoped lang="scss">
.history_record_wrap {
  justify-content: space-between;
  width: 100%;
  height: 100%;

}
</style>
