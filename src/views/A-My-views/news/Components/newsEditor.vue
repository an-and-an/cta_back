<template>
  <div>
    <div>123456</div>
    <!-- <div class="modify_box" id="modify_box">
      <div style="width:100%;height: 60px;">
        <div style="width:50%;min-width:300px;float: left;">
          <el-input v-model="content.title" placeholder="请输入新闻标题" size="large" />
        </div>
        <div style="width:100px;float:right ;">
          <el-button @click="updateNews" type="primary">{{btnName}}</el-button>
        </div>
      </div>
      <div>
        <QuillEditor theme="snow" contentType="html" toolbar="full" v-model:content="content.content" />
      </div>
    </div>
    <div class="priview_box" id="priview_box">
      <div style="color:rgb(77, 112, 255);width:120px;height:40px;border-bottom: 3px solid rgb(77, 112, 255)">效果预览
      </div>
      <div class="preview_c" id="preview_c">
        <h2 style="text-align:center">{{content.title}}</h2>
        <div v-html="content.content"> </div>
      </div>
    </div> -->
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const test=inject(dialog)
// const { content, updateNews } = inject('content')
// const props=defineProps()
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.modify_box {
  float: left;
  width: 50%;
}

.priview_box {
  float: left;
  margin-left: 2%;
  width: 45%;
  padding: 10px;
}

.preview_c {
  margin-top: 15px;
}
</style>