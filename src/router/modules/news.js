
import { ROLES_OPTIONS } from '@/directive/roles'
const Layout = () => import("@/layout/index.vue");
const NewsHome = () => import("@/views/A-My-views/news/index.vue");
export default [
  {
    path: "/news",
    component: Layout,
    name: "news",
    meta: { title: "新闻管理" },
    icon: "DocumentCopy",
    children: [
      {
        path: "",
        name: "news1",
        component: NewsHome,
        meta: {
          title: "新闻管理",
          apis: [
            ROLES_OPTIONS['news1'].LOOK,
            ROLES_OPTIONS["news1"].CREATE,
            ROLES_OPTIONS["news1"].DELETE,
            ROLES_OPTIONS["news1"].UPDATE,
            ROLES_OPTIONS["news1"].AUDIT,
            ROLES_OPTIONS["news1"].REPULSE,
          ],
        },
        icon: "DocumentCopy",
      },
    ],
  },
];
