<script setup>
import { ref, reactive } from 'vue'
import { GetAllActiveList, SetStartTime, SetEndTime } from '@/api/activeTime.js'
import activeListTable from './ChildComponent/activeListTable.vue'
import setActiveTime from './ChildComponent/setActiveTime.vue'
import bottom from './ChildComponent/bottom.vue'
import { ElMessage } from 'element-plus'
import { parseTime } from '@/utils'
//所有活动列表
const activeList = reactive([])
const getAllActiveList = () => {
  GetAllActiveList().then(res => {
    activeList.splice(
      0,
      activeList.length,
      ...res.data.map(item => ({
        ...item,
        endTime: parseTime(new Date(item.endTime)),
        startTime: parseTime(new Date(item.startTime))
      }))
    )
  })
}
getAllActiveList()
//设置活动时间
const setActiveName = ref()
const showSetActive = ref(false)
const showSet = (active_name) => {
  setActiveName.value = active_name
  showSetActive.value = true
}
const setActiveTimeRange = (time1, time2) => {
  const start_time = time1.getTime()
  const end_time = time2.getTime()
  Promise.all([
    SetStartTime({
      name: setActiveName.value,
      time: start_time
    }),
    SetEndTime({
      name: setActiveName.value,
      time: end_time
    })
  ]).then(res => {
    if (res.some(item => item.code === 0)) {
      showSetActive.value = false
      getAllActiveList()
      ElMessage({
        type: 'success',
        message: '设置成功！',
        duration: 1000,
        offset: 250
      })
    } else {
      ElMessage({
        type: 'error',
        message: '设置失败，请重新设置！',
        duration: 1000,
        offset: 250
      })
    }
  })
}
</script>
<template>
  <div>
    <activeListTable :tableInfo="activeList" @setActive="showSet" />
    <setActiveTime v-if.async="showSetActive" :activeName="setActiveName" @setActiveTimeRange="setActiveTimeRange"
      @close="() => { showSetActive = false }" />
    <bottom :pageTotal="10" :page="20" />
  </div>
</template>