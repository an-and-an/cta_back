<template>
  <create-item-cpm
    ref="createItemRef"
    @create-item="(v: any) => emit('createItem', v)"
    :options="options"
  />
  <update-item-cpm
    ref="updateItemRef"
    @update-item="(v: any) => emit('updateItem', v)"
  />
  <upload-cpm
    ref="uploadRef"
    @upload-excel-over="() => emit('uploadExcelOver')"
  />
  <delete-cpm
    ref="deleteRef"
    :compitition="compitition"
    @batch-delete="(v: any) => emit('batchDelete', v)"
  />
</template>

<script lang="ts" setup>
import createItemCpm from './createItem.vue';
import updateItemCpm from './updateItem.vue';
import uploadCpm from './upload.vue';
import deleteCpm from './delete.vue';
const createItemRef = ref<InstanceType<typeof createItemCpm>>();
const updateItemRef = ref<InstanceType<typeof updateItemCpm>>();
const uploadRef = ref<InstanceType<typeof uploadCpm>>();
const deleteRef = ref<InstanceType<typeof deleteCpm>>();
const emit = defineEmits(['createItem', 'updateItem', 'batchDelete', 'uploadExcelOver']);
defineProps<{
  options: any,
  compitition: any,
}>();
defineExpose({
  openCreateItemDialog: () => createItemRef.value!.open(),
  closeCreateItemDialog: () => createItemRef.value!.close(),
  openUpdateItemDialog: (data: any) => updateItemRef.value!.open(data),
  closeUpdateItemDialog: () => updateItemRef.value!.close(),
  openUploadDialog: (data: any) => uploadRef.value!.open(data),
  closeUploadDialog: () => uploadRef.value!.close(),
  openDeleteDialog: () => deleteRef.value!.open(),
  closeDeleteDialog: () => deleteRef.value!.close(),
})
</script>

<style scoped>

</style>
