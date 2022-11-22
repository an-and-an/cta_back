<template>
  <div>
    <el-row style="width:100%;min-width:1200px" >
      <el-col :span="5">
        <el-select v-model="getRecordInfo.semester" @change="changeSemester" placeholder="Select" size="large">
          <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="getRecordInfo.group" @change="changeGroup" placeholder="Select" size="large">
          <el-option label="A组" :value="true" />
          <el-option label="B组" :value="false" />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-upload action="" :limit="1" :on-change="onChange" :auto-upload="false">
          <template #trigger>
            <el-button type="primary">上传榜单</el-button>
          </template>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="UPLOADTEMPLATE">下载模板</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="deLeteItems">批量删除</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="set">添加</el-button>
      </el-col>
      
    </el-row>
    <list :list="creditList" :select="BaseRow" :is-page="false">
      <el-table-column v-for="(item, index) in flexRow" :key="index" :label="item" width="80">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <p>{{ scope.row[scope.column.label]?.description }}</p>
              <div style="text-align: right; margin: 0;">
                <el-button size="small" type="danger" @click="handlerDel(scope.row[scope.column.label])">删除
                </el-button>
                <el-button size="small" type="primary" @click="handlerEdit(scope.row[scope.column.label])">修改
                </el-button>
              </div>
            </template>
            <template #reference>
              <el-tag v-if="scope.row[scope.column.label]?.integral" effect="dark"
                :type="type(scope.row[scope.column.label])">{{
                    scope.row[scope.column.label]?.integral
                }}</el-tag>
              <p v-else></p>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </list>
    <el-dialog v-model="dialog">
      <el-form ref="formRef" :model="currentData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="描述" prop="description">
          <el-input v-model="currentData.description" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="currentData.integral" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="table_dialog">
      <list :list="dialogList" :select="dialogRow" />
      <br>
      <el-input v-model="compititionName" placeholder="比赛名称" />
      <el-button type="success" @click="UPLOAD()">确定无误</el-button>
    </el-dialog>
    <!-- 单独新增积分记录 -->
    <el-dialog v-model="isShowSet" width="40%" style="min-width:400px;">
      <template #footer>
        <el-button @click="setNewRecord" type="primary" size="small">确认</el-button>
      </template>
      <el-form label-width="100px" :rules="rules" :model=setData>
        <el-form-item label="比赛名称 " prop="compititionName">
          <el-input v-model="setData.compititionName" placeholder="请输入比赛名称" clearable />
        </el-form-item>
        <el-form-item label="备注信息 " prop="description">
          <el-input v-model="setData.description" placeholder="请输入积分备注信息" clearable />
        </el-form-item>
        <el-form-item label="学号 " prop="studentId">
          <el-input v-model="setData.studentId" placeholder="请输入学号" clearable />
        </el-form-item>
        <el-form-item label="积分 " prop="integral">
          <el-input v-model="setData.integral" type="number" placeholder="请输入积分" clearable />
        </el-form-item>
        <el-form-item label="学期 " prop="semester">
          <el-select v-model="setData.semester" placeholder="请选择" size="large">
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="deleteDialog">
      <template #footer>
          <el-button @click="deleteMany" type="primary"> 
            确认
          </el-button>
      </template>
      <el-input v-model="inputToDelete" @change="deleteMany"  placeholder="请输入要删除记录的比赛名称" />
    </el-dialog>
  </div>

</template>
<script setup>
import { ref, reactive } from "vue"
import { read, utils } from 'xlsx'
import { GetRecord, UpdateRecord, SetRecord, DeleteRecord } from '@/api/competition_credit'
import { apiOver } from '@/utils/api'
import { ElMessage } from 'element-plus'
import List from '@/components/common/list/index.vue'
// 获取/查询积分记录, public
const creditList = ref([])
const BaseRow = ref([
  {
    label: '排名',
    prop: 'rank',
    width: 60,
  },
  {
    label: '专业',
    prop: 'major',
    width: 180,
  },
  {
    label: '姓名',
    prop: 'username',
    width: 120,
  },
  {
    label: '总分',
    prop: '总分',
    width: 80,
  }
])
const dialogRow = ref([
  {
    label: '排名',
    prop: 'rank',
    width: 50
  }, {
    label: '姓名',
    prop: 'username',
    width: 120
  }, {
    label: '学号',
    prop: 'studentId',
    width: 180
  }, {
    label: '积分',
    prop: 'integral',
    width: 80
  }, {
    label: '上传',
    prop: 'upload',
    width: 180
  }
])
const dialogList = ref([])
const flexRow = ref([])
const date = new Date()
const dialog = ref(false)
const table_dialog = ref(false)
const compititionName = ref('')
const currentData = ref({
  id: '',
  description: '',
  integral: '',
})
const currentYear = date.getFullYear()
const getRecordInfo = ref({
  semester: `${currentYear}-${currentYear + 1}`,
  group: false,
})
const options = ref([])
for (let i = 0; i < 4; i++) {
  options.value.push(`${currentYear - i}-${currentYear - i + 1}`)
}
async function getRecord() {
  const res = await GetRecord(getRecordInfo.value)
  creditList.value = res.list.map((item, index) => {
    const temp = {
      rank: index + 1,
      major: item.user.major,
      username: item.user.username,
      '总分': item.ans,
    }
    item.list.forEach(element => {
      temp[element.competitionName] = element
    });
    return temp
  })
  flexRow.value = res.row
  flexRow.value.shift()
}

function type(row) {
  if (row?.description?.includes('30')) return 'warning';
  if (row?.description?.includes('10')) return 'success';
  if (row?.description?.includes('20')) return '';
  return 'info'
}

function handlerEdit(row) {
  dialog.value = true
  currentData.value = row
}
async function handlerDel(row) {
  const res = await DeleteRecord({ id: row.id })
  if (res.code === 0) ElMessage({ type: 'success', message: res.message })
  else ElMessage({ type: 'warning', message: res.message })
  await getRecord()
}

async function submitForm() {
  const { id, description, integral } = currentData.value
  const res = await UpdateRecord({ id, description, integral })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: res.message })
    await getRecord()
    dialog.value = false;
  } else {
    ElMessage({ type: 'warning', message: res.message })
  }
}
const readFile = (file) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}
async function onChange(file) {
  try {
    let dataBinary = await readFile(file.raw)
    let workBook = read(dataBinary, { type: 'binary', cellDates: true })
    let workSheet = workBook.Sheets[workBook.SheetNames[0]]
    const data = utils.sheet_to_json(workSheet)
    for (const item of ['rank', 'studentId', 'username', 'integral']) {
      if (!data[0][item]) {
        ElMessage({ type: 'error', message: '请按照规定格式' })
        return;
      }
    }
    ElMessage({ type: 'success', message: '解析成功' })
    table_dialog.value = true;
    dialogList.value = data.map((item) => {
      const { rank, studentId, username, integral } = item
      return {
        rank, studentId, username, integral
      }
    });
  } catch (error) {
    table_dialog.value = false;
    dialogList.value = []
    ElMessage({ type: 'error', message: '解析失败, 请按照规定格式' })
  }
}
async function sleep(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
async function UPLOAD() {
  if (!compititionName.value) {
    ElMessage({ type: 'warning', message: '请输入比赛名称' })
    return
  }
  const len = dialogList.value.length
  await Promise.all(dialogList.value.map(async (item, idx) => {
    const { integral, studentId } = item
    // if (integral === 4) description = `前10%`
    let description = ''
    // switch (integral) {
    //   case 4:
    //     description = `前10%`
    //     break;
    //   case 3:
    //     description = '前20%'
    //     break;
    //   case 2:
    //     description = '前30%'
    //     break;
    //   case 1:
    //     description = '参与奖'
    //     break;
    // }
    if (item.rank <= Math.ceil(len * .1)) description = `前10%`
    else if (item.rank <= Math.ceil(len * .3)) description = '前20%'
    else if (item.rank <= Math.ceil(len * .6)) description = '前30%'
    else description = '参与奖'
    await sleep(500)
    const res = await SetRecord({
      integral,
      studentId,
      description,
      semester: getRecordInfo.value.semester,
      compititionName: compititionName.value
    })
    if (res.code === 0) {
      dialogList.value[idx].upload = '上传成功'
    } else {
      dialogList.value[idx].upload = '上传失败' + res.message
    }
  }))
  ElMessage({ type: 'success', message: '上传完成，请查看对应积分' })
}
function UPLOADTEMPLATE() {
  const header = [{ rank: 'rank', studentId: 'studentId', username: 'username', integral: 'integral' }]
  const fileName = '周赛结果.xls'
  const a = document.createElement('a')
  const result = header.map(v => {
    return Object.values(v).join('\t')
  }).join('\n')
  a.href = URL.createObjectURL(new Blob([result]))
  a.setAttribute('download', fileName)
  a.click()
}
getRecord()
//单独添加
const isShowSet = ref(false)
function set() {
  isShowSet.value = true
}
const setData = reactive(
  {
    semester: '2022-2023',
    compititionName: '',
    integral: '',
    description: '',
    studentId: '',
  }
)
const rules = ref(
  {
    compititionName:
      [
        { required: true, message: '请输入比赛名称！', trigger: 'blur' },
      ],
    description:
      [
        { required: true, message: '请输入积分备注！', trigger: 'blur' },
      ],
    studentId:
      [
        { required: true, message: '请输入学号!', trigger: 'blur' },
        { min: 11, max: 11, message: '请检查学号是否输入正确！', trigger: 'blur' }
      ],
    integral:
      [
        { required: true, message: '请输入积分!', trigger: 'blur' },
      ],
    semester:
      [
        { required: true, message: '请选择学期！', trigger: 'blur' },
      ]
  }
)

function setNewRecord() {
  SetRecord(setData).then(res => {
    apiOver(() => {
      isShowSet.value = false  
    }, res.code, res.message, {
      duration: 1000,
      offset: 250,
    })
    getRecord()
  })
}
      
//批量删除
const inputToDelete=ref()
const deleteDialog=ref(false)
function deLeteItems() {
  deleteDialog.value=true
}
function checkCompetition(array, name) {
  var flag = false
  var deleteSuccess = true
  array.forEach(item => {
    for (var i in item) {
      if (i === inputToDelete.value) {
        flag = true
        DeleteRecord({ id: item[i].id }).then(res => {
          if(res.code != 0) deleteSuccess = false
        })
      }
    }
  })
  if (flag) {
    if (deleteSuccess) apiOver(() => { getRecord() }, 0, '删除成功！', { offset: 250, duration: 1000 })
    else  apiOver(() => { }, 1, '删除失败，请检查操作！', { offset: 250, duration: 1000 })
  } else {
    apiOver(()=>{},2,'请输入正确的比赛名称！',{offset:250,duration:1000})
  }
}
function deleteMany() {
  if (inputToDelete.value ) {
    deleteDialog.value = false
    checkCompetition(creditList.value,inputToDelete.value)
  } else {
    apiOver(()=>{},2,'请输入需要批量删除数据的比赛名称！',{offset:250,duration:1000})
  }
  
  
}

//换组
function changeGroup(val) {
  getRecordInfo.value.group = val
  getRecord()
}

//换届
function changeSemester(val) {
  getRecordInfo.value.semester = val
  getRecord()
}
</script>