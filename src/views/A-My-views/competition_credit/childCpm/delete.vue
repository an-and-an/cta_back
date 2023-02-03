<template>
  <el-dialog v-model="dialog" title="批量删除" :width="450">
    <el-form label-width="140px">
      <el-form-item label="比赛名称：">
        <el-select v-model="data">
          <el-option
            v-for="item in compitition"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="batchDeleteEvent">
          确定删除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
const emit = defineEmits(['batchDelete'])
const dialog = ref(false);
const data = ref('');
defineProps<{
  compitition: any[],
}>();
function close() {
  dialog.value = false;
}
defineExpose({
  open: () => dialog.value = true,
  close
});
function batchDeleteEvent() {
  if (data.value) emit('batchDelete', data.value);
  else ElMessage({ type: 'warning', message: '请选择比赛' });
  
}
</script>

<style scoped>

</style>
