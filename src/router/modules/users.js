import { ROLES_OPTIONS } from "@/directive/roles";
const Layout = () => import("@/layout/index.vue");
const Admin = () => import("@/views/A-My-views/users/index.vue");

export default [
  {
    path: "/users",
    component: Layout,
    name: "users",
    meta: { title: "用户管理" },
    icon: "User",
    children: [
      {
        path: "",
        name: "users1",
        component: Admin,
        meta: {
          title: "用户管理",
          apis: [
            ROLES_OPTIONS["users1"].UPDATE,
            ROLES_OPTIONS["users1"].DELETE,
          ],
        },
        icon: "User",
      },
    ],
  },
];
