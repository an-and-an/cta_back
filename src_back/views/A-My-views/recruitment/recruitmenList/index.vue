<template>
  <top @changeUserInfo="changeUserInfo" @changeUserInfoByState="changeUserInfoByState"
    @showAddDialog="showAddOfficial=true" :showSelectDepartmentView="showSelectDepartmentView" />
  <recruitmentTable :userInfo="recuitmentsUserInfo" @itemClick="itemClick" />
  <el-drawer v-model="isShowDetailRecruitmrntInfo" size="50%">
    <review :user="DetailRecruitmrntInfo" class="details" @audit="passFirstTrial" :status="status" />
  </el-drawer>
  <setOfficial :showAddOfficial="showAddOfficial" />

</template>
<script setup>
import { ref, reactive } from 'vue'
import top from '@/views/A-My-views/recruitment/recruitmenList/top.vue'
import recruitmentTable from './recruitmentTable.vue';
import review from './review.vue'
import setOfficial from './setOfficial.vue';
import { GetRecruitment } from '@/api/recruitment'
import { GetUserinfo } from '@/api/login'
import { FirstTrialRecruitment } from '@/api/recruitment'
import { ElMessage } from 'element-plus'
const recuitmentsUserInfo = ref([])
const getRecruitmentsData = reactive({
  department: "",
  page: 1,
  pageSize: 10,
  status: "delivered",
})
//选取部门
const changeUserInfo = (value) => {
  getRecruitmentsData.department = value
  GetRecruitment(getRecruitmentsData).then(res => {
    recuitmentsUserInfo.value = res.list
  }).catch(err => {
    console.log(err);
  })
}
//选取状态
const changeUserInfoByState = (value) => {
  getRecruitmentsData.status = value
  GetRecruitment(getRecruitmentsData).then(res => {
    recuitmentsUserInfo.value = res.list
  }).catch(err => {
    console.log(err);
  })
}
//初始值
const showSelectDepartmentView = ref(false)
GetUserinfo().then(res => {
  // 前台用户
  if (res.data.type) {
    //前台用户---正副部长
    if (res.data.roles === "minister" && res.data.identity.duty == "部长") {
      getRecruitmentsData.department = res.data.identity.department
      GetRecruitment(getRecruitmentsData).then(res => {
        recuitmentsUserInfo.value = res.list
      }).catch(err => {
        // console.log(err);
      })
    }
  }//后台管理员
  else {
    // 最高管理员和正副会长
    if (res.data.roles.id == 21 || res.data.roles.id == 28) {
      showSelectDepartmentView.value = true
      getRecruitmentsData.department = "算法竞赛部"
      GetRecruitment(getRecruitmentsData).then(res => {
        recuitmentsUserInfo.value = res.list
      }).catch(err => {
        // console.log(err);
      })
    }
  }
})
//浏览申请表详细信息
const isShowDetailRecruitmrntInfo = ref(false)
const DetailRecruitmrntInfo = ref({})
function itemClick(id) {
  isShowDetailRecruitmrntInfo.value = true
  const _ = recuitmentsUserInfo.value.find(item => item.id === id)
  DetailRecruitmrntInfo.value = {
    ..._,
    username: _.user.username,
    gender: _.user.gender,
    major: _.user.major,
    college: _.user.college,
    class: _.user.class,
  }
}
//初筛
const status = ref()
const passFirstTrial = (trailId, trail) => {
  console.log(trail);
  if (trail == true) {
    status.value = 1
  } else {
    status.value = 2
  }
  FirstTrialRecruitment({
    id: trailId,
    status: trail,
  }).then(res => {
    if (res.code == 0)
      ElMessage({
        type: "success",
        message: res.message,
        offset: 200,
      })
    else
      ElMessage({
        type: "error",
        message: res.message,
        offset: 200,
      })
  }).catch(err => {
    console.log(err);
  })
}
//设置干事
const showAddOfficial = ref(false)
</script>
<style>
.details {
  float: left;
}
</style>