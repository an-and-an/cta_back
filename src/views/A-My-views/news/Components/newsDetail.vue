<template>
  <div>
    <el-dialog v-model="showDialog" width="50%" @close="offDialog">
      <div class="news_title" id="news_title" width="50%">
        <h2 style="text-align:center"> {{newsInfo.title}}</h2>
      </div>
      <div v-html="newsInfo.content"></div>
    </el-dialog>
  </div>
</template>
<script setup>
defineProps(['showDialog', 'newsInfo'])
const emit = defineEmits(['off'])
//关闭对话框
const offDialog = () => {
  emit('off')
}
</script>
<style scoped>

</style>