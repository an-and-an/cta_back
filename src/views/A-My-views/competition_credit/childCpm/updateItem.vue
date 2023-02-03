<template>
  <el-dialog v-model="dialog">
    <el-form
      ref="formRef"
      :model="currentData"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="currentData.description"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="积分" prop="integral">
        <el-input
          v-model="currentData.integral"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="() => emit('updateItem', currentData)"
        >Submit</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const dialog = ref(false);
const currentData = ref({
  id: "",
  description: "",
  integral: "",
});
const emit = defineEmits(["updateItem"]);
defineExpose({
  open: (data: any) => {
    currentData.value.id = data.id;
    currentData.value.description = data.description;
    currentData.value.integral = data.integral;
    dialog.value = true;
  },
  close: () => {
    dialog.value = false;
  },
});
</script>

<style scoped></style>
