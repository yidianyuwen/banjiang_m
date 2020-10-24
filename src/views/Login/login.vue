<template>
  <div class="login flex_column">
    <div class="login_logo">
      <img class="logo_img" src="../../assets/logo.png" alt="" />
    </div>
    <div class="login_options">
      <el-input class="mb20" v-model="accont" clearable placeholder="账号" />
      <el-input class="mb20" v-model="passWord" show-password clearable placeholder="密码"/>
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

  // mounted() {}

  _login() {
    const postData = {
      custNo: this.accont,
      custPwd: this.passWord
    };
    console.log("login", postData);
    login(postData).then((res: any) => {
      console.log('loginres =>', res);
      // this.$store.dispatch('userInfo', res.data);
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
      this.$router.push({ path: "/taskSelect" });
    }).catch((err: any) => {
      console.log('loginerr =>', err);
    });
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
