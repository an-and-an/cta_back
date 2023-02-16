<template>
  <h3>{{ group ? '动态组' : '静态组' }}</h3>
  <el-table :data="list" style="width: 1000px" max-height="600">
    <el-table-column fixed="left" prop="teamName" label="队伍" width="160" align="center" />
    <el-table-column label="作品" width="200px" align="center">
      <template #default="scope">
        <a :href="scope.row.websiteUrl" target="_blank">{{ scope.row.workName }}</a>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item, idx) in select"
      :key="item"
      :prop="`teacher${idx + 1}`"
      :label="`teacher${idx + 1}`"
      width="100"
      align="center"
    />
    <el-table-column v-if="group" prop="avg" label="平均分" width="100" align="center" />
    <el-table-column v-if="group" prop="networkScore" label="网安得分" width="120" align="center" />
    <el-table-column fixed="right" label="最终得分" width="120" align="center" >
      <template #default="scope">
        {{ scope.row.avg + (group ? scope.row.networkScore : 0) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
defineProps<{
  list: any[],
  select: string[],
  group: boolean,
}>();
</script>