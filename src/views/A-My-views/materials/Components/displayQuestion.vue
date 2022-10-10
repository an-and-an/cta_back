<template>
  <div>
    <div>题目列表</div>
    <div v-for="(item,index) in questionList" :key="item.id">
      <Question :questionNo="index+1" :question="item.topic" :questionType="item.type" :optionA="item.optionA"
        :optionB="item.optionB" :optionC="item.optionC" :optionD="item.optionD" :ans="item.ans" />
    </div>
  </div>
</template>
<script setup>
import Question from './Question.vue'
import { GetQuestionList, SetNewQuestion, UpdateQuestion, DeleteQuestion } from '@/api/computer_competition'
import { ref } from 'vue'
//获取题目列表
const questionList = ref([])
const getInfo = ref({
    page: 1,
    pageSize: 10,
    content: ''
})
const getList = (getInfo) => {
    GetQuestionList({
        page: getInfo.page,
        pageSize: getInfo.pageSize,
        content: getInfo.content
    }).then(res => {
        questionList.value = res.list
    })
}
getList(getInfo)

</script>