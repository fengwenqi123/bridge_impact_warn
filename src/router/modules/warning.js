/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/views/layout/index";

const warning = {
  path: "/warning",
  component: Layout,
  redirect: "/warning/warning-list",
  name: "warning",
  alwaysShow: true,
  meta: { title: "偏航预警查询", icon: "warning", roles: ["warning"] },
  children: [
    {
      path: "warning-list",
      name: "warning-list",
      component: () => import("@/views/warning/list/index"),
      meta: { keepAlive: false, title: "偏航预警查询", roles: ["warning:list"] }
    }
  ]
};

export default warning;
