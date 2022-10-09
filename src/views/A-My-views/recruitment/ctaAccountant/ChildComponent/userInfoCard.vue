<script setup>
import { ref, watch } from 'vue'
import { GetAllOfficial, GetAllUser } from '@/api/user'
import UserInfoCardItem from './userInfCardItem.vue'
import ListCpm from '@/components/common/list/index.vue'
import { debounce } from '@/utils/index.js';
import { Replacement, SetCadres as finallySetCadres } from '@/api/replacement'
import { queryActive } from '@/api/activeTime'
import { ElMessage } from 'element-plus';
import { pinyin } from 'pinyin-pro';
import { GetUserinfo } from '@/api/login'
import { left } from '@popperjs/core';
//获取所有用户
const allUserList = ref({})
// 对话框
const dialogTableVisible = ref(false)
let currentDuty = ''
// 对话框的搜索框
const search = ref('')
const page = ref(1)
const pageSize = ref(10)
const totalNumber = ref(0)
// 对话框的表单的数据
const list = ref([])
// 选择显示的字段
const select = [
  {
    label: '姓名',
    prop: 'username',
    width: 180,
    fixed: 'left',
  },
  {
    label: '专业',
    prop: 'major',
    width: 180,
    fixed: false,
  },
  {
    label: '班级',
    prop: 'class',
    width: 180,
    fixed: false,
  },
];
const roles = ref(false);
(async function () {
  let { data } = await GetUserinfo()
  if (!data.type && data.roles.id === 21) roles.value = true
  await queryActive('replacement').then(res => {
    if (res.data) roles.value = true
    else roles.value = false
  })
})()

// 获取干事干部列表
function getAllOfficial(cuser) {
  GetAllOfficial().then(res => {
    allUserList.value = res
  })
}
// 点击换届
async function replacement() {
  const { data } = await queryActive('replacement')
  if (data) {
    try {
      await Replacement()
      ElMessage({
        type: 'success',
        message: '设置成功'
      })
      getAllOfficial()
    } catch (error) {
      ElMessage({
        type: 'error',
        message: error
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '当前时间不能换届'
    })
  }
  // 
}
// 点击设置干部
function setCadres(department, duty) {
  const _department = pinyin(department, { toneType: 'none', type: 'array', heteronym: true })
    .map(item => item[0].toUpperCase())
    .reduce((pre, current) => pre + current, '')
  const __duty = pinyin(duty, { toneType: 'none', type: 'array', heteronym: true })
    .map(item => item[0].toUpperCase())
    .reduce((pre, current) => pre + current, '')
  const _duty = __duty === 'MSC' ? 'MSZ' : __duty
  currentDuty = `${_department}_${_duty}`;
  dialogTableVisible.value = true
}
// 选择这个用户进行选择
async function handleEdit(_idx, studentId) {
  try {
    await finallySetCadres({
      studentId,
      role: currentDuty
    })
    ElMessage({
      type: 'success',
      message: '设置成功'
    })
    dialogTableVisible.value = false
    getAllOfficial()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error
    })
  }
}
function getAllUserList() {
  GetAllUser({
    page: page.value,
    pageSize: pageSize.value,
    content: search.value
  }).then(res => {
    list.value.splice(0, list.value.length, ...res.list)
    totalNumber.value = res.total
  })
}
// 分页
function pageChange(n) {
  page.value = n
  getAllUserList()
}
// 分页大小发生改变
function sizeChange(n) {
  pageSize.value = n
  getAllUserList()
}
const toSearch = debounce(function (e) {
  getAllUserList()
}, 500)

// created
getAllOfficial()

watch(dialogTableVisible, getAllUserList)
</script>
<template>
  <div>
    <!-- 换届按钮 -->
    <div style="position:relative;width:100%;height:30px;" v-if="roles">
      <el-button type="primary" text size="large" style="position:absolute;right:0" @click="replacement">换届
      </el-button>
    </div>

    <div v-for="(department, key1) in allUserList" :key="key1" class="item">
      <h2>{{ key1 }}</h2>
      <div v-for="(duty, key2) in department" :key="key2">
        <div class="title">
          <h5>{{ key2 }}</h5>
          <div v-if="key2 !== '干事' && roles" class="replate" @click="setCadres(key1, key2)">
            <el-icon color="grey" :title="`点击设置 ${key1}${key2}`">
              <Plus />
            </el-icon>
          </div>
        </div>
        <user-info-card-item v-for="(user, idx) in duty" :key="idx" :user-info="user" />
      </div>
    </div>

    <el-dialog v-model="dialogTableVisible" title="Shipping address" width="80%">
      <list-cpm :list="list" :select="select" :is-page="true" :page="page" @page-change="pageChange"
        :total-number="totalNumber" @size-change="sizeChange">
        <el-table-column>
          <template #header>
            <el-input v-model="search" size="small" placeholder="搜索" @input="toSearch" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row.studentId)">选中</el-button>
          </template>
        </el-table-column>
      </list-cpm>
    </el-dialog>
  </div>
</template>
    
<style scoped>
.title {
  display: flex;
  min-width: 1200px;
}

.title h5 {
  padding-left: 50px;
  flex: 4;
  margin: 0;
}

.replate {
  flex: 4;
}

.replate:hover {
  cursor: pointer;
}
</style>