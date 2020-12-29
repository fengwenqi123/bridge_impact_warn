/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/views/layout/index";

const video = {
  path: "/video",
  component: Layout,
  redirect: "/video/video-list",
  name: "video",
  alwaysShow: true,
  meta: { title: "视频管理", icon: "video", roles: ["video"] },
  children: [
    {
      path: "video-list",
      name: "video-list",
      component: () => import("@/views/video/list/index"),
      meta: { keepAlive: false, title: "视频列表", roles: ["video:list"] }
    },
    {
      path: "videoManagement",
      name: "videoManagement",
      component: () => import("@/views/video/videoManagement/index"),
      meta: {
        keepAlive: false,
        title: "参数设置",
        roles: ["video:videoManagement"]
      }
    }
  ]
};

export default video;
