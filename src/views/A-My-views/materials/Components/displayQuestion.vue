<template>
  <div>
    <div v-for="(item,index) in questionList" :key="item.id">
      <div style="float:right">
        <el-button type="danger" icon="Delete" size="small" @click="itemClick(item.id,index+1)" />
        <el-button type="primary" icon="Edit" size="small" @click="editClick(item)" />
      </div>
      <Question :questionNo="index+1" :question="item.topic" :questionType="item.type" :optionA="item.optionA"
        :optionB="item.optionB" :optionC="item.optionC" :optionD="item.optionD" :ans="item.ans" />
    </div>
    <el-dialog v-model="isShowDialog" class="dialog">
      确认删除题目&nbsp;{{deleteNo}}&nbsp;?
      <template #footer>
        <el-button type="primary" size="small" @click="comfirmDelete">
          确认
        </el-button>
      </template>
    </el-dialog>
    <edit v-if="isShowEditDialog" :editInfo="editInfo" @offEdit="offEdit" />
  </div>
</template>
<script setup>
import Question from './Question.vue'
import edit from './edit.vue'
import { DeleteQuestion } from '@/api/computer_competition'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps(['questionList'])
const emit = defineEmits(['update'])
//点击编辑
const editInfo = ref({})
const isShowEditDialog = ref(false)
const editClick = (val) => {
  editInfo.value = val
  isShowEditDialog.value = true
}
const offEdit = () => {
  emit('update')
  isShowEditDialog.value = false
}
//点击删除
const isShowDialog = ref(false)
const deleteNo = ref()
const deleteId = ref()
const itemClick = (id, no) => {
  deleteId.value = id
  deleteNo.value = no
  isShowDialog.value = true
}
const comfirmDelete = () => {
  DeleteQuestion(deleteId.value).then(res => {
    if (res.code === 0) {
      emit('update')
      ElMessage({
        type: 'success',
        message: '删除成功！',
        offset: 250,
        duration: 1000,
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.message,
        offset: 250,
        duration: 3000,
      })
    }
  })
  isShowDialog.value = false
}
</script>
<style scoped>
.dialog {
  width: 300px;
}
</style>