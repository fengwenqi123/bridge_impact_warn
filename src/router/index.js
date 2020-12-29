import Vue from "vue";
import Router from "vue-router";
import base from "./modules/base";
import system from "./modules/system";
import video from "./modules/video";
import warning from "./modules/warning";
import journal from "./modules/journal";
import yawWarning from "./modules/yawWarning";
import electronicFence from "./modules/electronicFence";
import map from "./modules/map";

Vue.use(Router);

// 解决router回调报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const constantRouterMap = [...base];

export const asyncRouterMap = [
  map,
  electronicFence,
  warning,
  yawWarning,
  video,
  journal,
  system,
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];
export default new Router({
  mode: "history", // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
