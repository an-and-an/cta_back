<template>
  <div class="bottom_pagination" id="bottom_pagination">
    <el-pagination
      background
      layout="page-sizes,prev, pager, next, slot, total"
      :total="totalNumber"
      :page-size="_pageSize"
      :page-sizes="[]"
      :pager-count="is_pc ? 7 : 5"
      :default-page-size="10"
      :default-current-page="1"
      :current-page="page"
      @current-change="handler"
      @size-change="handleSizeChange"
      :small="!is_pc"
    >
      <el-input
        style="width: 80px; margin: 0 10px;"
        v-model.number="_pageSize"
      />
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from '@/utils';
const emit = defineEmits(['pageChange', 'sizeChange'])
const _pageSize = ref<number>(10);
defineProps(['totalNumber', 'page', 'is_pc'])
//当前页变化
function handler(newPage: number) {
  emit('pageChange', newPage)
}
function handleSizeChange(newPageSize: number) {
  emit('sizeChange', newPageSize)
}
watch(_pageSize, debounce(([n, o]: number[]) => handleSizeChange(n), 500))
</script>
<style scoped>
.bottom_pagination {
  position: sticky;
  bottom: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>