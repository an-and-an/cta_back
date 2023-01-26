<template>
  <el-drawer
    v-model="drawer"
    :title="currentRole?.roleName + '的路由'"
    :size="is_pc ? '40%' : '70%'"
    :direction="is_pc ? 'rtl' : 'btt'"
  >
    <role-tree
      ref="treeRef"
      :data="asyncRoutesTree"
      :current-data="routerList"
      @get-tree-checked-list="(v: any) => {
        emit('getTreeCheckedList', currentRole.id, v)
      }"
    />
  </el-drawer>
</template>

<script lang="ts" setup>
import { asyncRoutesTree } from '@/router';
import { getRouterApiTree } from '@/directive/roles';
import roleTree from './tree.vue';
const treeRef = ref<InstanceType<typeof roleTree>>();
const drawer = ref<boolean>(false);
const emit = defineEmits(['getTreeCheckedList']);
const store = useStore();
// 当前角色对应的路由
const routerList = ref<string[]>([]);
defineProps<{
  is_pc: boolean,
}>();
const currentRole = ref({
  id: 0,
  roleName: '',
  roleDescription: '',
})
defineExpose({
  open: async (role: any) => {
    currentRole.value.id = role.id;
    currentRole.value.roleName = role.roleName;
    currentRole.value.roleDescription = role.roleDescription;
    drawer.value = true;
    
    const res = await getRouterByRole(role.id);

    routerList.value = getRouterApiTree(res.data);
    
    // root管理员起码保证有配置路由的权限
    if (role.id === 1) {
      routerList.value.push('roles');
    }
    // 等待组件渲染完后再进行设置，保证先后顺序
    nextTick(() => {
      treeRef.value!.setCheckedNodes(routerList.value)
    });
  },
  close: () => drawer.value = false,
})

</script>

<style scoped>

</style>
