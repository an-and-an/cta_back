<template>
  <update-cpm
    ref="updateRef"
    :is_pc="is_pc"
    @update="(v: any) => emit('update', v)"
  />
  <create-cpm
    ref="createRef"
    :is_pc="is_pc"
    @create="(v: any) => emit('create', v)"
  />
  <update-router-cpm
    ref="updateRouterRef"
    :is_pc="is_pc"
    @get-tree-checked-list="(id: number, v: any) => {
      emit('getTreeCheckedList', id, v)
    }"
  />
</template>

<script lang="ts" setup>
import updateCpm from './update.vue';
import createCpm from './create.vue';
import updateRouterCpm from './updateRouter.vue';
const emit = defineEmits(['update', 'create', 'getTreeCheckedList']);
const updateRef = ref<InstanceType<typeof updateCpm>>();
const createRef = ref<InstanceType<typeof createCpm>>();
const updateRouterRef = ref<InstanceType<typeof updateRouterCpm>>();
defineProps<{
  is_pc: boolean,
}>();
defineExpose({
  openUpdateDrawer: (role: any) => updateRef.value!.open(role),
  openCreateDrawer: () => createRef.value!.open(),
  openUpdateRouterDrawer: (role: any) => updateRouterRef.value!.open(role),
  closeUpdateDrawer: () => updateRef.value!.close(),
  closeCreateDrawer: () => createRef.value!.close(),
  closeUpdateRouterDrawer: () => updateRouterRef.value!.close(),
})
</script>

<style scoped>

</style>
