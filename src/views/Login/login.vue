<template>
  <div class="login flex_column">
    <div class="login_logo">
      <img class="logo_img" src="../../assets/logo.png" alt="" />
    </div>
    <div class="login_options">
      <el-input class="mb20" v-model="accont" clearable placeholder="账号" />
      <el-input class="mb20" v-model="passWord" show-password clearable placeholder="密码"/>
      <el-checkbox class="mb20" v-model="checked">记住密码</el-checkbox>
      <span class="custom_btn custom_shadow bg_orange text_white" @click="_login">登 录</span>
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
import {login} from "@/api/login";

@Component({
  name: "Login",
  components: {}
})
export default class Login extends Vue {
  // @Prop() data!: any;
  private accont: any = "";
  private passWord: any = "";
  private checked = false;

  mounted() {
    // !TODO 记住密码待优化
    this.getCookie();
  }

  _login() {
    const postData = {
      custNo: this.accont,
      custPwd: this.passWord
    };
    console.log("login", postData);
    login(postData).then((res: any) => {
      //判断复选框是否被勾选 勾选则调用配置cookie方法
      if (this.checked == true) {
        console.log("checked == true");
        //传入账号名，密码，和保存天数3个参数
        this.setCookie(this.accont, this.passWord, 365);
      }else {
        console.log("清空Cookie");
        //清空Cookie
        this.clearCookie();
      }

      console.log('loginres =>', res);
      // this.$store.dispatch('userInfo', res.data);
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
      this.$router.push({ path: "/taskSelect" });
    }).catch((err: any) => {
      console.log('loginerr =>', err);
    });
  }

  //设置cookie
  setCookie(name: any, pwd: any, exdays: any) {
    const exdate: any = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = "accont" + "=" + name + ";path=/;expires=" + exdate.toGMTString();
    window.document.cookie = "userPwd" + "=" + pwd + ";path=/;expires=" + exdate.toGMTString();
  }

  //读取cookie
  getCookie() {
    if (document.cookie.length > 0) {
      const arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
      for (let i = 0; i < arr.length; i++) {
        this.checked = true;
        const arr2 = arr[i].split('='); //再次切割
        //判断查找相对应的值
        if (arr2[0] == 'accont') {
          this.accont = arr2[1]; //保存到保存数据的地方
        } else if (arr2[0] == 'userPwd') {
          this.passWord = arr2[1];
        }
      }
    }
  }

  //清除cookie
  clearCookie() {
    this.setCookie(null, "", -1); //修改2值都为空，天数为负1天就好了
  }

  // @Watch("")
}
</script>

<style scoped lang="scss">
.login {
  justify-content: space-around;
  width: 100%;
  height: 100%;

  .login_logo {
    width: 100%;
    .logo_img {
      width: 100%;
    }
  }
  .login_options {
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
  }
}
</style>
