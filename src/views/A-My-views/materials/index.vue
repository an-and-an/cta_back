<script setup>
import { ref } from 'vue'
import { GetQuestionList, SetNewQuestion, UpdateQuestion, DeleteQuestion } from '@/api/computer_competition'
import Question from './Components/Question.vue'
const questionList = ref([])
//获取题目列表
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
//题目信息
</script>
<template>
    <div>
        <div>资料管理页面</div>
        <div v-for="(item,index) in questionList" :key="item.id">
            <Question  :questionNo="index+1" :question="item.topic" :questionType="item.type" :optionA="item.optionA" :optionB="item.optionB"  :optionC="item.optionC" :optionD="item.optionD" :ans="item.ans" />
        </div>
    </div>
</template>
<style>

</style>