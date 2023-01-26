<template>
  <el-drawer
    v-model="drawer"
    title="新建角色"
    :size="is_pc ? '40%' : '70%'"
    :direction="is_pc ? 'rtl' : 'btt'"
  >
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="createRoleDto.roleName"/>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input v-model="createRoleDto.roleDescription"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emit('create', createRoleDto)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

</template>

<script lang="ts" setup>
const drawer = ref<boolean>(false);
const emit = defineEmits(['create'])
defineProps<{
  is_pc: boolean,
}>();
const createRoleDto = ref({
  roleName: '',
  roleDescription: '',
})
defineExpose({
  open: () => drawer.value = true,
  close: () => drawer.value = false,
})

</script>

<style scoped>

</style>
