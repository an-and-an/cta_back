<template>
  <div>
    <el-dialog v-model="dialog" class="dialog" :show-close="close">
      <template #footer>
        <el-button type="primary" size="small" @click="comfirmEdit">提交</el-button>
      </template>
      <div class="question_edit">
        <span>题型：</span>
        <el-select v-model="questionInfo.type">
          <el-option v-for="item in types" :key="item.value" :label="item.description" :value="item.value" />
        </el-select>
        <span>答案：</span>
        <el-select v-model="questionInfo.ans" v-if="questionInfo.type=='MultipleChoice'" multiple>
          <el-option v-for="(item,index) in anss" :key="index" :label="item" :value="item" />
        </el-select>
        <el-select v-model="questionInfo.ans"
          v-if="questionInfo.type=='singleChoice' || questionInfo.type=='Judmental'">
          <el-option v-for="(item,index) in anss" :key="index" :label="item" :value="item" />
        </el-select>
        <span>题目：</span>
        <el-input v-model="questionInfo.topic" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" />
        <span>A：</span>
        <el-input v-model="questionInfo.optionA" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" />
        <span>B：</span>
        <el-input v-model="questionInfo.optionB" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" />
        <span>C：</span>
        <el-input v-model="questionInfo.optionC" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" />
        <span>D：</span>
        <el-input v-model="questionInfo.optionD" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" />
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { UpdateQuestion } from '@/api/computer_competition'
const emit = defineEmits(['offEdit '])
const props = defineProps(['editInfo'])
const close = ref(false)
const dialog = ref(true)
const questionInfo = ref({
  id: '',
  topic: '',
  type: '',
  ans: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',

})
//答案
function getAns(type) {
  let ans = questionInfo.value.ans;
  let idx = 0;
  if (type === 1 || type === 3) {
    while (ans) {
      if (ans & 1) {
        questionInfo.value.ans = anss[3 - idx];
        break
      }
      ans >>= 1;
      idx++;
    }
  } else {
    questionInfo.value.ans = []
    while (ans) {
      if (ans & 1) {
        questionInfo.value.ans.push(anss[3 - idx]);
      }
      ans >>= 1;
      idx++;
    }
  }
}
const anss = ['A', 'B', 'C', 'D']
const init = () => {
  questionInfo.value = props.editInfo
  getAns(questionInfo.value.type)
  if (questionInfo.value.type === 1) {
    questionInfo.value.type = 'singleChoice'
  }
  if (questionInfo.value.type === 2) {
    questionInfo.value.type = 'MultipleChoice'
  }
  if (questionInfo.value.type === 3) {
    questionInfo.value.type = 'Judmental'
  }
}
init()
//题型
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
//点击提交
function comfirmEdit() {
  dialog.value = false
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

  UpdateQuestion({
    ans: questionInfo.value.ans,
    type: questionInfo.value.ans,
  }, {
    id: questionInfo.value.id,
    topic: questionInfo.value.topic,
    optionA: questionInfo.value.optionA,
    optionB: questionInfo.value.optionB,
    optionC: questionInfo.value.optionC,
    optionD: questionInfo.value.optionD
  }).then(res => {
    if (res.code === 0) {
      emit('offEdit')
      console.log('修改成功');
    }
  })
}
</script>
<style scoped>
.question_edit span {
  display: block;
  width: 100%;
  height: 20px;
  margin-top: 10px;
}
</style>