<template>
  <!-- 优势：不卡顿，缺点：第一次加载需要花费很长时间，非常浪费性能，所以建议使用V2版本(./listV2.vue)  -->
  <list :list="creditList" :select="BaseRow" :is-page="false" :maxHeight="700">
    <el-table-column
      v-for="(item, index) in flexRow"
      :key="index"
      :label="item"
      width="80"
    >
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <p>{{ scope.row[scope.column.label]?.description }}</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="small"
                type="danger"
                @click="() => emit('deleteItem', scope.row[scope.column.label])"
              >删除</el-button>
              <el-button
                size="small"
                type="primary"
                @click="emit('EditItem', scope.row[scope.column.label])"
              >修改</el-button>
            </div>
          </template>
          <template #reference>
            <el-tag
              v-if="scope.row[scope.column.label]?.integral"
              effect="dark"
              :type="type(scope.row[scope.column.label])"
              >{{ scope.row[scope.column.label]?.integral }}</el-tag
            >
            <p v-else></p>
          </template>
        </el-popover>
      </template>
    </el-table-column>
  </list>
</template>

<script lang="ts" setup>
import List from "@/components/common/list/index.vue";

// 获取/查询积分记录, public
defineProps<{
  creditList: any[];
  flexRow: any[];
}>();
const emit = defineEmits(["deleteItem", "EditItem"]);
const BaseRow = ref([
  {
    label: "排名",
    prop: "rank",
    width: 60,
    fixed: 'left',
  },
  {
    label: "专业",
    prop: "major",
    width: 160,
    fixed: 'left',
  },
  {
    label: "姓名",
    prop: "username",
    width: 80,
    fixed: 'left',
  },
  {
    label: "总分",
    prop: "总分",
    width: 60,
    fixed: 'left',
  },
]);

function type(row: any) {
  if (row?.description?.includes('30')) return 'warning';
  if (row?.description?.includes('10')) return 'success';
  if (row?.description?.includes('20')) return '';
  return 'info';
}

</script>

<style scoped></style>
