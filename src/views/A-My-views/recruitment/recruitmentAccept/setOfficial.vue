<template>
  <div>
    <h2>添加干事</h2>
  </div>
  <div>
    <el-dialog v-model="showAddOfficial" width="30%">
      <div>
        <el-form label-width="70px" label-position="left">
          <el-form-item label="用户id" :required="true">
            <el-input v-model="formData.id" />
          </el-form-item>
          <el-form-item label="部门" :required="true">
            <el-select v-model="formData.department" @change="getDepartments" class="m-2" placeholder="请选择部门"
              size="large">
              <el-option v-for="(department,index) in departments" :key="index" :label="department" :value="department" />
            </el-select>
          </el-form-item>
          <div style="display: flex; justify-content: center;">
            <el-button type="primary" @click="addOfficialAccount" size="small">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue'
import { GetAllDepartment } from '@/api/recruitment'
const emit = defineEmits(['audit'])
const addOfficialAccount = () => {
  emit('addOfficialAccount', formData.id, formData.department)
}
defineProps(['showAddOfficial'])
const formData = ref({
  id: "",
  department: "",
})
const departments = ref([])
const getDepartments = (() => {
  GetAllDepartment().then(res => {
    Object.keys(res.data).forEach(val => {
      departments.value.push(res.data[val])
    })
  }).catch(err => {
    console.log(err);
  })
})

</script>
<style>

</style>