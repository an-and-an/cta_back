
import { ROLES_OPTIONS } from '@/directive/roles';
const Layout = () => import("@/layout/index.vue");
const Lib = () => import("@/views/A-My-views/materials/index.vue");
export default [
  {
    path: "/materials",
    component: Layout,
    name: "materials",
    meta: { title: "竞赛题库" },
    icon: "Folder",
    children: [
      {
        path: "",
        name: "material1",
        component: Lib,
        meta: {
          title: "竞赛题库",
          apis: [
            ROLES_OPTIONS['material1'].LOOK,
            ROLES_OPTIONS['material1'].CREATE,
            ROLES_OPTIONS['material1'].UPDATE,
            ROLES_OPTIONS['material1'].DELETE,
          ]
        },
        icon: "el-icon-location",
      },
    ],
  },
];
