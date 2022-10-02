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

//编辑器内容更改时
// @editorChange="onEditorChange()"
// const onEditorChange = debounce(
//   () => {
//     console.log("编辑器内容发生变化")
//     state._content = state.content
//     console.log(state._content)
//   }, 3000
// )
//在羽毛笔初始化
// const onEditorReady = quill => {
//   console.log('editor ready!', quill)
// }

// 图片上传前拦截
// const beforeAvatarUpload = (file) => {
//   const type = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
//   const isJPG = type.includes(file.type);
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isJPG) {
//     ElMessage({
//       message: "图片格式错误",
//       type: "success",
//     });
//   }
//   if (!isLt2M) {
//     ElMessage({
//       message: "上传图片不能超过" + size.value + "M",
//       type: "success",
//     });
//   }
// }
</script>