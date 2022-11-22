<template>
  <div>
    <QuillEditor theme="snow" contentType="html" toolbar="full" v-model:content="state.content" />
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const props = defineProps(['default_content'])
const state = reactive({
  content: props.default_content,
  _content: '',
  editorOption: {
    placeholder: 'core',
    modules: {},
  }
})
</script>