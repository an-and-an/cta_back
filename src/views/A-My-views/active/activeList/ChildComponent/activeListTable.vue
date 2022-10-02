<script setup>
  import {ref} from 'vue'
defineProps(['tableInfo'])
const emit = defineEmits(['setActive'])
const searchValue = ref()
// 搜索活动
const getSearch = () => {
  
}
const setActive = (name) => {
  emit('setActive',name)
}
</script>
<template>
  <div>
    <el-table :data="tableInfo" style="width: 100%" height="600">
      <el-table-column prop="id" label="活动id" width="120" />
      <el-table-column prop="activeName" label="活动名称" width="300px">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="250px" />
      <el-table-column prop="endTime" label="结束时间" width="250px" />
      <el-table-column prop="" label="" width="320px">
        <template #header>
          <el-input v-model="searchValue" @input="getSearch" :clearable="true" 
            placeholder="请输入要搜索的活动" width="300px">
          </el-input>
        </template>
        <template #default="scope">
          <el-button  @click="setActive(scope.row.activeName)"  type="primary" circle style="position:relative;left:70px;">
            <div>
              <el-icon size="large"><Edit /></el-icon>
            </div>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>