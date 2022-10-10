<template>
  <div>
    <h5>国信安作品审核</h5>
    <el-radio-group v-model="display" style="margin-bottom: 30px">
      <el-radio-button label="1">未审核</el-radio-button>
      <el-radio-button label="3">已拒绝</el-radio-button>
    </el-radio-group>
    <el-tabs tab-position="right"  class="demo-tabs">
      <el-tab-pane label="static">
        <div v-for="item in staticWorkList" class="card_container">
          <workInfoCard :work="item" @audit="getFirstTrial" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="dynamic">
        <div v-for="item in dynamicWorkList" class="card_container">
          <workInfoCard :work="item" @audit="getFirstTrial" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import workInfoCard from './workInfoCard.vue'
import { GetUnapprovedWork, FirstTrialGxaWork } from '@/api/guoxinan'
import { ref } from 'vue'
const display = ref()
//国信安作品初审
const getFirstTrial = (id, ans) => {
  FirstTrialGxaWork({
    id: id,
    status: ans,
  }).then(res => {
    console.log(res.message);
  })
}
//获取所有未审核或拒绝的作品
const staticWorkList = ref([])
const dynamicWorkList = ref([])
const rejectedWorkList = ref([])
const getUnapprovedWork = () => {
  GetUnapprovedWork().then(res => {
    console.log(res.data);
    dynamicWorkList.value = res.data.dynamic
    staticWorkList.value = res.data.static
    rejectedWorkList.value = res.data.rejected
  })
}
getUnapprovedWork()

</script>
<style scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.card_container {
  width: 520px;
}
</style>