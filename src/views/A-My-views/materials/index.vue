<script setup>
import bottom from '@/views/A-My-Views/users/bottom.vue'
import displayQuestion from './Components/displayQuestion.vue'
import setQuestion from './Components/setQuestion.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { GetQuestionList, SetNewQuestion } from '@/api/computer_competition'

//获取题目列表
const total = ref()
const questionList = ref([])
const getInfo = ref({
    page: 1,
    pageSize: 10,
    content: ''
})
function getList(){
    GetQuestionList(getInfo.value).then(res =>{
        total.value = res.total
        questionList.value = res.list
    })
}
getList()

//添加题目
const setNewQuetion = (info) => {
    SetNewQuestion(
        {
            ans: info.ans,
            type: info.ans,
        },
        {
            topic: info.topic,
            optionA: info.optionA,
            optionB: info.optionB,
            optionC: info.optionC,
            optionD: info.optionD
        }
    ).then(res => {
        if (res.code === 0) {
            getList()
            ElMessage(
                {
                    type: 'success',
                    message: '添加成功！',
                    offset: 250,
                    duration: 1000,
                }
            )
        } else {
            ElMessage(
                {
                    type: 'error',
                    message: res.message,
                    offset: 250,
                    duration: 1000,
                }
            )
        }
    })
}

//查询题目
const search = (info) => {
    getInfo.value.content = info
    getList()
}

//更新页
const getNewPage = (page) => {
    getInfo.value.page = page
    getList()
}
const pageSizeUpdate = (pageSize) => {
    getInfo.value.pageSize = pageSize
    getList()
}
</script>
<template>
    <div class="basic_box">
        <setQuestion @setQuestion="setNewQuetion" @search="search" @update="getList" />
        <displayQuestion :questionList="questionList" :showOp="true" @update="getList" />
        <bottom 
        :pageTotal="total" 
        :page="getInfo.page" 
        @getNewPage="getNewPage" 
        @pageSizeUpdate="pageSizeUpdate"  
        class="pager"
        />
    </div>
</template>
<style scoped>
.basic_box {
    width: 100%;
    min-width: 700px;
}

.pager {
    z-index: 999;
}
</style>