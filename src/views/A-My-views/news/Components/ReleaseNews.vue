<template>
  <div>
    <el-dialog v-model="showDialog" width="80%" @close="offDialog">
      <div style="width:100%;height: 60px;">
        <div style="width:50%;min-width:300px;float: left;">
          <el-input v-model="newsTitle" placeholder="请输入新闻标题" size="large" />
        </div>
        <div style="width:100px;float: right;">
          <el-button @click="release" type="primary">发布</el-button>
        </div>
      </div>
      <div >
        <QuillEditor theme="snow" contentType="html" toolbar="full" v-model:content="state.content" />
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage } from 'element-plus';
const emit = defineEmits(['off', 'releaseNews'])
defineProps(['showDialog'])

const newsTitle = ref()
const state = reactive({
  content: '新闻内容',
  _content: '',
  editorOption: {
    placeholder: 'core',
    modules: {},
  }
})
//发布
const release = () => {
  if (newsTitle.value) {
    emit('releaseNews', newsTitle.value, state.content)
    offDialog()
  } else {
    ElMessage({
      type: 'warning',
      message: '新闻标题不能为空，请检查输入！',
      offset: 250,
      duration: 1000,

    })
  }
}
//关闭对话框
const offDialog = () => {
  emit('off')
}
</script>