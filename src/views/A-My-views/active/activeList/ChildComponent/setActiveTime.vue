<script setup>
import { ref } from 'vue'
defineProps(['activeName'])
const emit = defineEmits(['setActiveTimeRange', 'close'])
const dialog = ref(true)
const activeTime = ref([])
const setActiveTime = (time) => {
  emit('setActiveTimeRange', time[0], time[1])
}
</script>
<template>
  <div>
    <!-- 设置活动开始时间 -->
    <el-dialog v-model="dialog" width="800px" top="20%" :center="true" :show-close="false" :before-close="(done) => {
      $emit('close');
      done()
    }">
      <template #header>
        <span>设置&nbsp;{{activeName}}&nbsp;活动时间</span>
      </template>
      <div class="edit_box">
        <el-date-picker v-model="activeTime" @change="setActiveTime" type="datetimerange" range-separator="至"
          start-placeholder="开始时间" end-placeholder="结束时间" size="large" />
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.edit_box {
  margin: 20px 160px;
  width: 100%;
  height: 50px;
}
</style>