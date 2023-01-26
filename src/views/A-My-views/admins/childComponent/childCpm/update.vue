<template>
  <el-drawer
    v-model="drawer"
    title="更新信息"
    :size="is_pc ? '40%' : '70%'"
    :direction="is_pc ? 'rtl' : 'btt'"
  >
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="currentRole.roleName"/>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input v-model="currentRole.roleDescription"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emit('update', currentRole)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const drawer = ref<boolean>(false);
const emit = defineEmits(['update'])
defineProps<{
  is_pc: boolean,
}>();
const currentRole = ref({
  id: 0,
  roleName: '',
  roleDescription: '',
})
defineExpose({
  open: (role: any) => {
    currentRole.value.id = role.id;
    currentRole.value.roleName = role.roleName;
    currentRole.value.roleDescription = role.roleDescription;
    drawer.value = true;
  },
  close: () => drawer.value = false,
})
</script>

<style scoped>

</style>
