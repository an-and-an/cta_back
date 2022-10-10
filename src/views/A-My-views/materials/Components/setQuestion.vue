<script setup>
import { ref } from 'vue'
const dialog = ref(false)
const set = () => {
  dialog.value = true
}
const questionInfo = ref({
  topic: '',
  type: '单选题',
  ans: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',

})
//选择题型
const types = [
  {
    value: 'singleChoice',
    description: '单选题',
  },
  {
    value: 2,
    description: '多选题',
  },
  {
    value: 3,
    description: '判断题',
  }
]
//答案
const anss = ['A', 'B', 'C', 'D']
//添加
const add = () => {
  dialog.value = false
  console.log(点击添加按钮);
}
</script>
<template>
  <div>
    <el-button text type="primary" @click="set">
      新建
    </el-button>
    <el-dialog v-model="dialog" :show-close="false">
      <template #footer>
        <el-button type="primary" @click="add">添加</el-button>
      </template>
      <!-- 选择题型 -->
      <el-select v-model="questionInfo.type">
        <el-option v-for="item in types" :key="item.value" :label="item.description" :value="item.value" />
      </el-select>
      <!-- 答案 -->
      <el-select v-model="questionInfo.ans">
        <el-option v-for="(item,idx) in anss" :key="idx" :label="item" :value="item" />
      </el-select>
      <!-- 题目 -->
      <el-input v-model="questionInfo.topic" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea"
        placeholder="请输入题目" />
      <!-- 选项 -->
      <div>
        <span>A:</span>
        <el-input v-model="questionInfo.optionA" :autosize="{ minRows: 1, maxRows: 5 }" type="textarea"
          placeholder="" />
      </div>
      <div>
        <span>B:</span>
        <el-input v-model="questionInfo.optionB" :autosize="{ minRows: 1, maxRows: 5 }" type="textarea"
          placeholder="" />
      </div>
      <div>
        <span>C:</span>
        <el-input v-model="questionInfo.optionC" :autosize="{ minRows: 1, maxRows: 5 }" type="textarea"
          placeholder="" />
      </div>
      <div>
        <span>D:</span>
        <el-input v-model="questionInfo.optionD" :autosize="{ minRows: 1, maxRows: 5 }" type="textarea"
          placeholder="" />
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>

</style>