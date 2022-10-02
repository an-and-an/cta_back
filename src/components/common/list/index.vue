<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column v-for="(item, idx) in select" :render-header="item.header" :key="idx" :prop="item.prop"
        :label="item.label" :width="item.width" :fixed="item.fixed">
      </el-table-column>
      <slot></slot>
    </el-table>
    <pager v-if="isPage" :page="props.page" :total-number="props.totalNumber" @page-change="pageChange"
      @size-change="sizeChange" />
  </div>
</template>
<script setup>
import Pager from './pager.vue'
const props = defineProps(['list', 'select', 'totalNumber', 'page', 'isPage'])
const emit = defineEmits(['pageChange', 'sizeChange'])
function pageChange(n) {
  emit('pageChange', n)
}
function sizeChange(n) {
  emit('sizeChange', n)
}
</script>
<style scoped>

</style>