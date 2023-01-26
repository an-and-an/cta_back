
import { ROLES_OPTIONS } from "@/directive/roles";
const Layout = () => import("@/layout/index.vue");
const Admin = () => import("@/views/A-My-views/admins/index.vue");
const AdminRouter = () =>
  import("@/views/A-My-views/admins/childComponent/getRoutersByRole.vue");
export default [
  {
    path: "/admins",
    name: "admins",
    component: Layout,
    meta: { title: "管理员管理" },
    icon: "Avatar",
    children: [
      {
        path: "",
        name: "admin1",
        component: Admin,
        meta: {
          title: "管理员列表",
          apis: [
            ROLES_OPTIONS["admin1"].CREATE,
            ROLES_OPTIONS["admin1"].DELETE,
            ROLES_OPTIONS["admin1"].UPDATE,
          ],
        },
        icon: "List",
      },
      {
        path: "getRoutersByRole",
        name: "getRoutersByRole",
        component: AdminRouter,
        meta: {
          title: "管理员路由设置",
          apis: [
            ROLES_OPTIONS["getRoutersByRole"].CREATE,
            ROLES_OPTIONS["getRoutersByRole"].DELETE,
            ROLES_OPTIONS["getRoutersByRole"].UPDATE,
          ],
        },
        icon: "Place",
      },
    ],
  },
];
