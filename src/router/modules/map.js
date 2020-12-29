/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/views/layout/index";

const map = {
  path: "/map",
  component: Layout,
  redirect: "/map/mapView",
  name: "map",
  alwaysShow: true,
  meta: { title: "地图", icon: "map", roles: ["map"] },
  children: [
    {
      path: "mapView",
      name: "mapView",
      component: () => import("@/views/map/index"),
      meta: { title: "地图" },
      roles: ["map:mapView"]
    }
  ]
};

export default map;
