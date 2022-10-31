<template>
  <div>
    <div v-for="(item, index) in questionList" :key="item.id">
      <div v-if="showOp" style="float:right">
        <el-button  @click="editClick(item)"  type="primary" icon="Edit" size="small"/>
        <el-button  @click="itemClick(item.id, index + 1)" type="danger" icon="Delete" size="small" />
      </div>
      <Question  :questionNo="index + 1"  :questionInfo="item" />
    </div>
    <edit v-if="isShowEditDialog" :editInfo="editInfo" @offEdit="offEdit" />
    <el-dialog v-model="isShowDeleteDialog" class="dialog">
      <template #footer>
        <el-button type="primary" size="small" @click="comfirmDelete">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import Question from './Question.vue'
import edit from './edit.vue'
import { ref } from 'vue'
import { DeleteQuestion } from '@/api/computer_competition'
import { ElMessage } from 'element-plus'

const props = defineProps(['questionList', 'showOp'])
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
const isShowDeleteDialog = ref(false)
const deleteNo = ref()
const deleteId = ref()
const itemClick = (id, no) => {
  deleteId.value = id
  deleteNo.value = no
  isShowDeleteDialog.value = true
}
const comfirmDelete = () => {
  DeleteQuestion(deleteId.value).then(res => {
    if (res.code === 0) {
      emit('update')
      ElMessage(
        {
        type: 'success',
        message: '删除成功！',
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
        duration: 3000,
        }
      )
    }
  })
  isShowDeleteDialog.value = false
}
</script>
<style scoped>
.dialog {
  width: 300px;
}
</style>