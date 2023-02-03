<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" :max-height="maxHeight">
      <el-table-column
        v-for="(item, idx) in select"
        :render-header="item.header"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
        align="center"
      >
      </el-table-column>
      <slot></slot>
    </el-table>
    <pager
      v-if="isPage"
      :page="page"
      :total-number="totalNumber"
      @page-change="pageChange"
      @size-change="sizeChange"
    />
  </div>
</template>
<script lang="ts" setup>
import Pager from "./pager.vue";
defineProps(["list", "select", "totalNumber", "page", "isPage", "maxHeight"]);
const emit = defineEmits(["pageChange", "sizeChange"]);
function pageChange(n: number) {
  emit("pageChange", n);
}
function sizeChange(n: number) {
  emit("sizeChange", n);
}
</script>
<style scoped></style>
