<template>
  <div>
    <div>
      <el-table :data="tableData " style="width: 100%">

        <!-- <el-table-column prop="" label="发布时间" width="200px" /> -->
        <el-table-column prop="author.username" label="发布用户" width="150px" />
        <el-table-column prop="title" label="标题" width="200px" :show-overflow-tooltip="true" />
        <el-table-column prop="content" label="内容" width="350px" :show-overflow-tooltip="true" />
        <el-table-column prop="" label="操作" width="300px" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="check(scope.row.id)" type="primary">
              查看
            </el-button>
            <el-button size="small" @click="modify(scope.row.id)" type="primary">
              修改
            </el-button>
            <el-button size="small" type="primary">
              打回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
defineProps(['tableData'])
const emit = defineEmits(['checkNews','modifyNews'])
//查看新闻
const check = (id) => {
  console.log("the id--", id)
  emit('checkNews', id)
}
// 修改新闻
const modify = (id) => {
  emit('modifyNews', id)
}
</script>
<style scoped>

</style>