import { ElTree, } from "element-plus";
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { ComponentInternalInstance } from "vue";

/**
 * 传入ref.value对象，返回选中的树
 * @param treeRef treeRef.value
 * @returns SelectOptionDto[]
 */
export function getCheckedTree(treeRef: any): any {
  const total: TreeNodeData[] = treeRef.getCheckedNodes(false, true);
  return buildTree(total);
}

function dfs(item: TreeNodeData, total: TreeNodeData[]) {
  const res: any = {
    label: item.label,
    value: item.value,
    children: [],
  }
  const children = [];
  for (const child of item.children) {
    let idx = total.findIndex((v) => v.$treeNodeId === child.$treeNodeId);
    if (idx >= 0) {
      children.push(child)
      total.splice(idx, 1);
    }
  }
  for (const child of children) {
    if (child.children && child.children.length > 0) {
      res.children!.push(dfs(child, total));
    } else {
      res.children!.push({
        label: child.label,
        value: child.value,
      })
    }
  }
  return res;
}
function buildTree(total: TreeNodeData[]) {
  const res = [];
  for (const item of total) {
    if (item.children && item.children.length > 0) {
      res.push(dfs(item, total));
    } else {
      res.push({
        label: item.label,
        value: item.value,
      })
    }
  }
  return res;
}

// function getItem(item: any) {
//   const res: any = {}
//   for (const key in item) {
//     let idx = tree.findIndex((v: any) => v.value === key);
//     if (idx >= 0) {
//       if (tree[idx].children) {
//         res[key] = getItem(item[key], tree[idx].children);
//       } else res[key] = item[key];
//     }
//   }
//   return res;
// }

// export function getFilterArrayByTree(data: any[]) {
//   const res = [];
//   for (const item of data) {
//     res.push(getItem(item));
//   }
//   return res;
// }