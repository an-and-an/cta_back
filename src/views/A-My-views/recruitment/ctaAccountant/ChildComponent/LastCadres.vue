<template>
  <el-select v-model="session" @change="changeSession" placeholder="Select" size="large">
    <el-option v-for="item in options" :key="item" :label="item" :value="item" />
  </el-select>
  <list-cpm :list="list" :select="select" />
</template>
<script setup>
import ListCpm from '@/components/common/list/index.vue'
import { GetAllFormerCadres } from '@/api/replacement'
import { ref } from 'vue'
// 搜索
const session = ref(2023)
// 列表
const list = ref([])
// 渲染数据
const select = [
  {
    prop: 'username',
    label: '姓名',
    width: 80,
    fixed: 'left'
  },
  {
    prop: 'college',
    label: '学院',
    width: 200
  },
  {
    prop: 'major',
    label: '专业',
    width: 200
  },
  {
    prop: 'class',
    label: '班级',
    width: 70
  },
  {
    prop: 'studentId',
    label: '学号',
    width: 120
  },
  {
    prop: 'identity',
    label: '部门职责/身份',
    width: 200,
    fixed: 'right'
  },
]
//选择届
const date = new Date()
const currentYear = date.getFullYear()
const options = ref([])
for (let i = 0; i < 4; i++) {
  options.value.push(`${currentYear - i + 1}`)
}
const changeSession = (val) => {
  session.value = val
  GetAllFormerCadre()
}
async function GetAllFormerCadre() {
  const res = await GetAllFormerCadres(session.value)
  list.value.splice(0, list.value.length, ...res.data)
}
GetAllFormerCadre()

</script>
<style>

</style>