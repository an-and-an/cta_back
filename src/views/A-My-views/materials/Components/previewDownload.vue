<template>
  <div>
    <el-dialog v-model="table_dialog">
      <displayQuestion :list="dialogList" :select="dialogRow" />
      <br>
      <el-input v-model="compititionName" placeholder="比赛名称" />
      <el-button type="success" @click="UPLOAD()">确定无误</el-button>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const table_dialog = ref(true)
const props = defineProps([''])
</script>