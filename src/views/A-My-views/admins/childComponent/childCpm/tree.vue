<template>
  <el-tree
    ref="tree"
    :props="props"
    :data="data"
    node-key="name"
    show-checkbox
    :default-checked-keys="currentData"
    check-on-click-node
  />
  <div class="bottom">
    <el-button>取消</el-button>
    <el-button @click="btnClick">确定</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';

defineProps<{
  data: any[],
  currentData: string[]
}>()
const emit = defineEmits(['getTreeCheckedList'])
const props = {
  label: 'title',
  children: 'children',
}
const tree = ref<InstanceType<typeof ElTree>>()
async function btnClick() {
  const curt: TreeNodeData[] = tree.value!.getCheckedNodes(false, true);
  const root: TreeNodeData[] = tree.value!.getCheckedNodes(false, true);
  const _1 = buildTree(curt, root);
  emit('getTreeCheckedList', _1);
}

function buildTree(checked: TreeNodeData[], root: TreeNodeData[]): any[] {
  const res: any[] = [];
  for (let i = 0, len = checked?.length; i < len; i ++ ) {
    const _1: any = {
      name: checked[i].name,
      children: [],
      api_value: 0,
    }
    
    // 检查当前节点在root中是否出现
    const idx: number = root.findIndex(
      (j) => j.$treeNodeId === checked[i].$treeNodeId
    );
    // 当前节点被选中
    if (idx !== -1) {
      // root中删除这个选中的
      root.splice(idx, 1);
      // 叶子节点，即需要计算出他的权限值
      if (checked[i].isYear) {
        let ans: number = 0;
        for (let j = 0, jlen = checked[i].children?.length; j < jlen; j ++ ) {
          // 检查是否被选中
          const idx: number = root.findIndex(
            (k) => k.$treeNodeId === checked[i].children[j].$treeNodeId
          );
          if (idx !== -1) {
            root.splice(idx, 1);
            ans |= checked[i].children[j].value;
          }
        }
        _1.api_value = ans;
      } else {
        _1.children = buildTree(checked[i].children, root);
      }
      res.push(_1);
    }
  }
  return res;
}
defineExpose({
  setCheckedNodes: (nodes: any) => {
    tree.value!.setCheckedKeys([]);
    tree.value!.setCheckedKeys(nodes);
  },
  setChecked: (nodes: string, flag: boolean) => {
    tree.value!.setChecked(nodes, flag, true);
  }
})
</script>

<style scoped>
.bottom{
  margin-top: 20px;
  margin-left: calc(100% - 120px);
}
.bottom .el-button {
  width: 50px;
}
</style>
