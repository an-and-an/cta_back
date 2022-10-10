<script setup>
import displayQuestion from './Components/displayQuestion.vue'
import setQuestion from './Components/setQuestion.vue'
import { ref } from 'vue'
import { GetQuestionList, SetNewQuestion, UpdateQuestion, DeleteQuestion } from '@/api/computer_competition'


</script>
<template>
    <div>
        <setQuestion />
        <displayQuestion />
    </div>
</template>
<style>

</style>