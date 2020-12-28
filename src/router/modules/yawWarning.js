/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/views/layout/index";

const yawWarning = {
  path: "/yawWarning",
  component: Layout,
  redirect: "/yawWarning/yawWarning-list",
  name: "yawWarning",
  alwaysShow: true,
  meta: { title: "预警类型管理", icon: "sys", roles: [] },
  children: [
    {
      path: "yawWarning-list",
      name: "yawWarning-list",
      component: () => import("@/views/yawWarning/index"),
      meta: { keepAlive: false, title: "预警类型管理", roles: [] }
    }
  ]
};

export default yawWarning;
