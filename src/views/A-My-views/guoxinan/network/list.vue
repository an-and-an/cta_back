<template>
  <el-table :data="data">
    <el-table-column fixed="left" label="作品" width="200px" align="center">
      <template #default="scope">
        <a :href="scope.row.websiteUrl" target="_blank">{{  scope.row.workName }}</a>
      </template>
    </el-table-column>
    <el-table-column label="打分">
      <template #default="scope">
        <el-rate
          v-model="scope.row.networkScore"
          :allow-half="true"
          @change="(v: any) => emit('audit', scope.row.id, scope.row.networkScore)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
defineProps<{
  data: any,
}>();
const emit = defineEmits(['audit']);
</script>

<style scoped>

</style>
