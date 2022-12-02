<template>
  <div>
    <h5>国信安作品审核</h5>
    <el-tabs tab-position="right" class="demo-tabs" >

      <el-tab-pane label="静态" >
        <el-row :gutter="15" justify="start" >
          <el-col  :span="12"  v-for="item in staticWorkList" class="card_container">
            <workInfoCard :work="item" :isGet="false" @audit="getFirstTrial" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="动态" class="work_box">
        <el-row :gutter="30" justify="start" >
          <el-col  :span="12"  v-for="item in dynamicWorkList" class="card_container">
            <workInfoCard :work="item" :isGet="true" @audit="getFirstTrial" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="已拒绝">
        <el-row :gutter="30" justify="start" >
          <el-col  :span="12"  v-for="item in rejectedWorkList" class="card_container">
            <workInfoCard :work="item" :isGet="true" @audit="getFirstTrial" />
          </el-col>
        </el-row>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>


<script setup>
import workInfoCard from './workInfoCard.vue'
import { ref } from 'vue'
import { GetUnapprovedWork, FirstTrialGxaWork } from '@/api/guoxinan'


//国信安作品初审
const getFirstTrial = (id, ans) => {
  FirstTrialGxaWork({
    id: id,
    status: ans,
  }).then(res => {
    getUnapprovedWork()
  })
}


//获取所有未审核或拒绝的作品
const staticWorkList = ref([])
const dynamicWorkList = ref([])
const rejectedWorkList = ref([])

const getUnapprovedWork = () => {
  GetUnapprovedWork().then(res => {
    console.log("the res is:",res);
    dynamicWorkList.value = res.data.dynamic
    staticWorkList.value = res.data.static
    rejectedWorkList.value = res.data.rejected
    console.log(dynamicWorkList.value);
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
  margin-bottom: 20px;
  /* margin: 10px; */
}

</style>