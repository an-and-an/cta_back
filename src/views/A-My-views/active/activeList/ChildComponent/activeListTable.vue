<script setup>
defineProps(['tableInfo'])
const emit = defineEmits(['setActive'])
const setActive = (name) => {
  emit('setActive', name)
}
</script>
<template>
  <div>
    <el-table :data="tableInfo" style="width: 100%">
      <el-table-column prop="id" label="活动id" width="120" />
      <el-table-column prop="activeName" label="活动名称" width="300px" />
      <el-table-column prop="startTime" label="开始时间" width="250px" />
      <el-table-column prop="endTime" label="结束时间" width="250px" />
      <el-table-column prop="" label="" width="320px">
        <template #default="scope">
          <el-button @click="setActive(scope.row.activeName)" type="primary" circle
            style="position:relative;left:70px;">
            <div>
              <el-icon size="large">
                <Edit />
              </el-icon>
            </div>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>