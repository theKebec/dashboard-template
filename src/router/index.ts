import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { getToken, setToken } from "@/utils/auth";

NProgress.configure({ showSpinner: false });

// 白名单
const whiteList: string[] = [];

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
  // // 单点登录 token
  // if (to.query.access_token) {
  //   setToken(to.query.access_token);
  //   window.location.href = "/";
  //   return;
  // }
  // // 已登录
  // if (getToken()) {
  //   next();
  // } else {
  //   // 未登录
  //   if (whiteList.includes(to.path)) {
  //     next();
  //   } else {
  //     // 关闭当前页面
  //     history.back();
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
