/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/views/layout/index";

const journal = {
  path: "/journal",
  component: Layout,
  redirect: "/journal/operation",
  name: "journal",
  alwaysShow: true,
  meta: { title: "日志管理", icon: "journal", roles: ["journal"] },
  children: [
    {
      path: "operation",
      name: "operation",
      component: () => import("@/views/journal/operation/index"),
      meta: {
        keepAlive: false,
        title: "操作日志",
        roles: ["journal:operation"]
      }
    },
    {
      path: "info",
      name: "info",
      component: () => import("@/views/journal/info/index"),
      meta: { keepAlive: false, title: "信息日志", roles: ["journal:info"] }
    }
  ]
};

export default journal;
