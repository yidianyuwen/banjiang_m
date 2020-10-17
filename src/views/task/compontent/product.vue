<template>
  <div>
    <div class="product_wrap flex_row" v-for="(item, index) in productData" :key="index">
      <div class="flex_column product_info">
        <span class="flex_column product_info" style="min-height: 120px">
          <span>{{ item.number }}</span>
          <span>{{ item.name }}</span>
        </span>
        <span>规格</span>
      </div>

      <div class="flex_column price_wrap">
        <span class="flex_row mb10">
          <el-input class="price_input" v-model="item.listPrice.priceOne" clearable placeholder="盘点数量" />
          <span class="price_unit">{{ item.listPrice.unitOne }}</span>
        </span>
        <span class="flex_row mb10">
          <el-input class="price_input" v-model="item.listPrice.priceTwo" clearable placeholder="盘点数量" />
          <span class="price_unit">{{ item.listPrice.unitTwo }}</span>
        </span>
        <span class="flex_row mb10">
          <el-input class="price_input" v-model="item.listPrice.priceThree" clearable placeholder="盘点数量" />
          <span class="price_unit">{{ item.listPrice.unitThree }}</span>
        </span>

        <span class="flex_row" style="justify-content: space-between">
          <span class="price_count fz12">盘点数量：{{ item.unitNum }}千克</span>
          <span class="price_count fz12">盘点金额：{{ item.unitPirce }}元</span>
        </span>
      </div>
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

@Component({
  name: "Product",
  components: {}
})
export default class Product extends Vue {
  // @Prop() productData!: any;
  private productData = [
    {
      number: "001",
      name: "商品一",
      listPrice: {
        priceOne: 100,
        unitOne: "单位一",
        priceTwo: "",
        unitTwo: "单位二",
        priceThree: "",
        unitThree: "单位三",
      },
      unitNum: "****",
      unitPirce: "****"
    },
    {
      number: "002",
      name: "商品二",
      listPrice: {
        priceOne: 100,
        unitOne: "单位一",
        priceTwo: "",
        unitTwo: "单位二",
        priceThree: "",
        unitThree: "单位三",
      },
      unitNum: "****",
      unitPirce: "****"
    }
  ];
  // mounted() {}
}
</script>

<style scoped lang="scss">
.product_wrap {
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 25px 0;
}

.product_info {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.price_wrap {
  flex: 2;
  line-height: 40px;

  .price_input {
    flex: 2;
  }
  .price_unit {
    flex: 1;
    text-align: center;
  }
  .price_count {
    flex: 1;
    text-align: left;
  }
}

</style>
