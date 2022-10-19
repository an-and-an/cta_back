<script setup>
import { ref } from 'vue'
import { debounce } from '@/utils'
const emit = defineEmits(['setQuestion','search'])
//搜索题目
const searchValue = ref()
const getSearch = debounce(() => {
  emit('search', searchValue.value)
},1000)
//
const dialog = ref(false)

const set = () => {
  dialog.value = true
}
const questionInfo = ref({
  topic: '',
  type: '',
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
    value: 'MultipleChoice',
    description: '多选题',
  },
  {
    value: 'Judmental',
    description: '判断题',
  }
]
//答案
const anss = ['A', 'B', 'C', 'D']
//添加
const add = () => {
  dialog.value = false
  console.log(questionInfo.value.type);
  if (questionInfo.value.type === "MultipleChoice") {
    const a = ref("")
    if (questionInfo.value.ans.find(item => item == 'A')) {
      a.value += 'A'
    }
    if (questionInfo.value.ans.find(item => item == 'B')) {
      a.value += 'B'
    }
    if (questionInfo.value.ans.find(item => item == 'C')) {
      a.value += 'C'
    }
    if (questionInfo.value.ans.find(item => item == 'D')) {
      a.value += 'D'
    }
    questionInfo.value.ans = a.value
  }
  emit('setQuestion', questionInfo.value)
}
</script>
<template>
  <div>
    <el-button text type="primary" @click="set" >
      新建
    </el-button>
     <el-input
      v-model="searchValue"
      class="w-50 m-2"
      placeholder="请输入要查询的题目内容"
      suffix-icon="Search"
      style="width:80%;min-width:500px;"
      @input="getSearch"
      @change="getSearch"
    />
    <el-dialog v-model="dialog" :show-close="false">
      <template #footer>
        <el-button type="primary" @click="add">添加</el-button>
      </template>
      <!-- 选择题型 -->
      <el-select v-model="questionInfo.type" placeholder="请选择题型">
        <el-option v-for="item in types" :key="item.value" :label="item.description" :value="item.value" />
      </el-select>
      <!-- 答案 -->
      <el-select v-model="questionInfo.ans" placeholder="请选择题目答案"
        v-if="questionInfo.type=='singleChoice' || questionInfo.type=='Judmental'">
        <el-option v-for="(item,idx) in anss" :key="idx" :label="item" :value="item" />
      </el-select>
      <el-select v-model="questionInfo.ans" v-if="questionInfo.type=='MultipleChoice'" multiple>
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
      <div v-if="questionInfo.type=='singleChoice' || questionInfo.type=='MultipleChoice'">
        <span>C:</span>
        <el-input v-model="questionInfo.optionC" :autosize="{ minRows: 1, maxRows: 5 }" type="textarea"
          placeholder="" />
      </div>
      <div v-if="questionInfo.type=='singleChoice' || questionInfo.type=='MultipleChoice'">
        <span>D:</span>
        <el-input v-model="questionInfo.optionD" :autosize="{ minRows: 1, maxRows: 5 }" type="textarea"
          placeholder="" />
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>

</style>