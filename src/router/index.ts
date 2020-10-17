/**
 * Author: Nicky
 * Data: 2020-10-13
 * Last Modify:
 */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login/login.vue")
  },
  { //
    path: "/taskSelect",
    name: "TaskSelect",
    component: () =>
      import(/* webpackChunkName: "task" */ "../views/task/taskSelect.vue")
  },
  {  // 任务盘点
    path: "/taskInventory",
    name: "TaskInventory",
    component: () =>
      import(/* webpackChunkName: "task" */ "../views/task/taskInventory.vue")
  },
  { // 历史记录
    path: "/historyRecord",
    name: "HistoryRecord",
    component: () =>
      import(/* webpackChunkName: "task" */ "../views/task/historyRecord.vue")
  },
  { // 成功提示页
    path: "/customSuccess",
    name: "CustomSuccess",
    component: () =>
      import(/* webpackChunkName: "task" */ "../compontent/CustomSuccess.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
