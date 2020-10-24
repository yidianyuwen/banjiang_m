<template>
  <div>
    <div class="product_wrap flex_row" v-for="(item, index) in productData" :key="index">
      <div class="flex_column product_info">
        <span class="flex_column product_info" style="min-height: 120px">
          <span>{{ item.spNo }}</span>
          <span>{{ item.spName }}</span>
        </span>
        <span>规格</span>
      </div>

      <div class="flex_column price_wrap">
        <span class="flex_row mb10">
          <el-input class="price_input mr10" v-model="item.num1First" @change="countChange(item)" clearable placeholder="盘点数量" />
          <el-input class="price_input" v-model="item.num1Two" @change="countChange(item)" clearable placeholder="盘点数量" />
          <span class="price_unit">{{ item.unit1 }}({{ item.unit1Coefficient }}克)</span>
        </span>
        <span class="flex_row mb10">
          <el-input class="price_input mr10" v-model="item.num2First" @change="countChange(item)" clearable placeholder="盘点数量" />
          <el-input class="price_input" v-model="item.num2Two" @change="countChange(item)" clearable placeholder="盘点数量" />
          <span class="price_unit">{{ item.unit2 }}({{ item.unit2Coefficient }}克)</span>
        </span>
        <span class="flex_row mb10">
          <el-input class="price_input mr10" v-model="item.num3First" @change="countChange(item)" clearable placeholder="盘点数量" />
          <el-input class="price_input" v-model="item.num3Two" @change="countChange(item)" clearable placeholder="盘点数量" />
          <span class="price_unit">{{ item.unit3 }}({{ item.unit3Coefficient }}克)</span>
        </span>

        <span class="flex_row" style="justify-content: space-between">
          <span class="price_count fz12">盘点数量：{{ countN(item) }}克</span>
          <span class="price_count fz12">盘点金额：{{ countM(item, index) }}元</span>
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
import { getProductData } from "@/api/taskInventory";
import { countNum, countMony } from "@/utils/utils";
import index from "@/store";


@Component({
  name: "Product",
  components: {},
})
export default class Product extends Vue {
  private productData = [];
  mounted() {
    this.getTaskInfo()
  }

  getTaskInfo() {
    const postData = {
    };
    getProductData(postData).then((res: any) => {
      console.log('getProductData =>', res.data);
      this.productData = res.data;
      this.$emit("productData", this.productData)
    }).catch((err: any) => {
      console.log('getProductDataerr =>', err);
    });
    // this.productData = [{
    //   unit1: '2',
    //   unit2: '2',
    //   unit3: '2',
    //   unit1Coefficient: 10,
    //   unit2Coefficient: 10,
    //   unit3Coefficient: 10,
    //   minOperateUnitPrice: 10,
    // },{
    //   unit1: '2',
    //   unit2: '2',
    //   unit3: '2',
    //   unit1Coefficient: 10,
    //   unit2Coefficient: 10,
    //   unit3Coefficient: 10,
    //   minOperateUnitPrice: 10,
    // }];
    // this.$emit("productData", this.productData)
  }

  countChange(item: any) {
    this.$emit("countChange", this.productData);
  }

  countN(item: any) {
    return countNum(item);
  }
  countM(item: any, index: any) {
    const countAmount = {
      countAmount: countMony(item)
    };
    Object.assign(this.productData[index], countAmount);
    return countMony(item);
  }
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
    /*flex: 2;*/
    width: 30%;
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
