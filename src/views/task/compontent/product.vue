<template>
  <div>
    <el-form ref="ruleForm" class="flex_column price_wrap" :model="productDataR" label-width="0px">
      <div v-for="(item, index) in productDataR['data']" :key="index">

        <div :class="['product_wrap','flex_row', (index%2 == 0)?'dark':null]">
          <div class="flex_column product_info">
          <span class="flex_column product_info" style="min-height: 120px">
            <span>{{ item.spNo }}</span>
            <span>{{ item.spName }}</span>
          </span>
            <span>{{ item.specs }}</span>
          </div>

          <div class="flex_column price_wrap">
            <div class="flex_row">
              <el-form-item class="price_input inline_block mr10" :prop="`data.${index}.num1First`" :rules="((item.num2First&&item.num2First !== '')||(item.num3First&&item.num3First !== ''))?{required: false,trigger: 'blur'}:rules.num1First">
                <el-input v-model="item.num1First" @change="countChange(item)" clearable placeholder="盘点数量" />
              </el-form-item>
              <el-form-item class="price_input inline_block" :prop="`data.${index}.num1Two`" :rules="rules.num1Two">
                <el-input v-model="item.num1Two" @change="countChange(item)" clearable placeholder="盘点数量" />
              </el-form-item>
              <span class="price_unit">{{ item.unit1 }}</span>
            </div>
            <div class="flex_row">
              <el-form-item class="price_input inline_block mr10" :prop="`data.${index}.num2First`" :rules="((item.num1First&&item.num1First !== '')||(item.num3First&&item.num3First !== ''))?{required: false,trigger: 'blur'}:rules.num2First">
                <el-input v-model="item.num2First" @change="countChange(item)" clearable placeholder="盘点数量" />
              </el-form-item>
              <el-form-item class="price_input inline_block" :prop="`data.${index}.num2Two`" :rules="rules.num2Two">
                <el-input v-model="item.num2Two" @change="countChange(item)" clearable placeholder="盘点数量" />
              </el-form-item>
              <span class="price_unit">{{ item.unit2 }}</span>
            </div>
            <div class="flex_row" v-if="isEmptyUnit(item)">
              <el-form-item class="price_input inline_block mr10" :prop="`data.${index}.num3First`" :rules="((item.num1First&&item.num1First !== '')||(item.num2First&&item.num2First !== ''))?{required: false,trigger: 'blur'}:rules.num3First">
                <el-input v-model="item.num3First" @change="countChange(item)" clearable placeholder="盘点数量" />
              </el-form-item>
              <el-form-item class="price_input inline_block" :prop="`data.${index}.num3Two`" :rules="rules.num3Two">
                <el-input v-model="item.num3Two" @change="countChange(item)" clearable placeholder="盘点数量" />
              </el-form-item>
              <span class="price_unit">{{ item.unit3 }}</span>
            </div>

            <span class="flex_row" style="justify-content: space-between">
            <span class="price_count fz12">盘点数量：{{ countN(item) }}克</span>
            <span class="price_count fz12">盘点金额：{{ countM(item, index) }}元</span>
          </span>
          </div>

          <!--      <div class="flex_column price_wrap">-->
          <!--        <span class="flex_row mb10">-->
          <!--          <el-input class="price_input mr10" v-model="item.num1First" @change="countChange(item)" type='number' clearable placeholder="盘点数量" />-->
          <!--          <el-input class="price_input" v-model="item.num1Two" @change="countChange(item)" type='number' clearable placeholder="盘点数量" />-->
          <!--          <span class="price_unit">{{ item.unit1 }}({{ item.unit1Coefficient }}克)</span>-->
          <!--        </span>-->
          <!--        <span class="flex_row mb10">-->
          <!--          <el-input class="price_input mr10" v-model="item.num2First" @change="countChange(item)" type='number' clearable placeholder="盘点数量" />-->
          <!--          <el-input class="price_input" v-model="item.num2Two" @change="countChange(item)" type='number' clearable placeholder="盘点数量" />-->
          <!--          <span class="price_unit">{{ item.unit2 }}({{ item.unit2Coefficient }}克)</span>-->
          <!--        </span>-->
          <!--        <span class="flex_row mb10" v-if="isEmptyUnit(item)">-->
          <!--          <el-input class="price_input mr10" v-model="item.num3First" @change="countChange(item)" type='number' clearable placeholder="盘点数量" />-->
          <!--          <el-input class="price_input" v-model="item.num3Two" @change="countChange(item)" type='number' clearable placeholder="盘点数量" />-->
          <!--          <span class="price_unit">{{ item.unit3 }}({{ item.unit3Coefficient }}克)</span>-->
          <!--        </span>-->

          <!--        <span class="flex_row" style="justify-content: space-between">-->
          <!--          <span class="price_count fz12">盘点数量：{{ countN(item) }}克</span>-->
          <!--          <span class="price_count fz12">盘点金额：{{ countM(item, index) }}元</span>-->
          <!--        </span>-->
          <!--      </div>-->
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
/**
 * Data: 2020-10-17
 * Author: Nicky
 * Last Modify:
 */

import {Component, Prop, Vue} from "vue-property-decorator";
import {getProductData} from "@/api/taskInventory";
import {getHistoryRecord} from "@/api/historyRecord";
import {countMony, countNum, formateData} from "@/utils/utils";
import {checkNum} from "@/utils/format";


@Component({
  name: "Product",
  components: {},
})
export default class Product extends Vue {
  private userInfo = JSON.parse(sessionStorage.getItem("userInfo") as string);
  @Prop() info?: any;
  private productData: any = [];
  private productDataR: any = {};
  private valid = true;

  get rules () {
    return {
      num1First: [
        {required: true, message: "请输入盘点数量", trigger: "blur"},
        {validator: checkNum, trigger: "change"}
      ],
      num1Two: [
        {required: false, validator: checkNum, trigger: "change"}
      ],
      num2First: [
        {required: true, message: "请输入盘点数量", trigger: "blur"},
        {validator: checkNum, trigger: "change"}
      ],
      num2Two: [
        {required: false, validator: checkNum, trigger: "change"}
      ],
      num3First: [
        {required: true, message: "请输入盘点数量", trigger: "blur"},
        {validator: checkNum, trigger: "change"}
      ],
      num3Two: [
        {required: false, validator: checkNum, trigger: "change"}
      ],
    };
  }

  mounted() {
    this.getTaskInfo();
    this.$on("bridge",(val: any)=>{
      this.submit(val);
    });
  }

  getTaskInfo() {
    if (this.info) {
      const postData = {
        checkFoodDate: formateData(this.info.checkFoodDate),
        shopId: this.userInfo.shopId,
        shopName: this.userInfo.shopName
      };
      getHistoryRecord(postData).then((res: any) => {
        this.productData = res.data.checkFoodsResList;

        this.productData = [];
        res.data.checkFoodsResList.map((data: any) => {
          this.productData = [...data.inventoryFoodsSingleReqList];
          this.productDataR = {data: [...data.inventoryFoodsSingleReqList]};
        });

        this.$emit("productData", this.productDataR.data)
      }).catch((err: any) => {
        console.log("err =>", err)
      });
    } else {
      getProductData({}).then((res: any) => {
        this.productData = res.data;
        this.productDataR = res;
        this.$emit("productData", this.productDataR.data)
      }).catch((err: any) => {
        console.log("err =>", err)
      });
    }
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

  isEmptyUnit(param: any) {
    return param.unit3Coefficient ? ( param.unit3Coefficient != "" && param.unit3 != "" ) : false;
  }

  countChange(item: any) {
    this.$emit("countChange", this.productData);
  }

  submit(val: any) {
    (this.$refs["ruleForm"] as any).validate((valid: any, el: any) => {
      if (valid) {
        this.$emit("submit", valid);
      } else {
        console.log("error submit!!");
        setTimeout(()=>{
          const isError: any = document.getElementsByClassName("is-error");
          isError[0].querySelector("input").focus();
        }, 100);
        return false;
      }
    })
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
  padding: 25px 0;
}

.product_info {
  /*flex: 1;*/
  width: 120px;
  justify-content: center;
  text-align: center;
}

.price_wrap {
  flex: 1;
  line-height: 40px;

  .price_input {
    /*flex: 2;*/
    width: 33%;
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
