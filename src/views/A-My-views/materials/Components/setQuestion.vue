<template>
  <div>
    <el-row style="width:100%;min-width:500px;">
      <el-col :span="1">
        <el-button text type="primary" @click="set">
          新建
        </el-button>
      </el-col>
      <el-col :span="7">
        <el-input v-model="searchValue" class="w-50 m-2" placeholder="请输入要查询的题目内容" suffix-icon="Search"
          style="width:40%;min-width:400px;margin-right: 20px;" @input="getSearch" @change="getSearch" />
      </el-col>
      <el-col :span="2">
        <el-upload action="" :limit="1" :on-change="onChange" :auto-upload="false">
          <template #trigger>
            <el-button type="primary">批量导入</el-button>
          </template>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="uploadTemplate">下载模板</el-button>
      </el-col>
    </el-row>

    <el-dialog v-model="dialog" :show-close="false">
      <template #footer>
        <el-button type="primary" @click="add">添加</el-button>
      </template>
      <!-- 选择题型 -->
      <el-select v-model="questionInfo.type" placeholder="请选择题型">
        <el-option v-for="item in types" :key="item.value" :label="item.description" :value="item.value" />
      </el-select>
      <!-- 答案 -->
      <el-select v-model="questionInfo.ans" placeholder="请选择题目答案"
        v-if="questionInfo.type == 'singleChoice' || questionInfo.type == 'Judmental'">
        <el-option v-for="(item, idx) in anss" :key="idx" :label="item" :value="item" />
      </el-select>
      <el-select v-model="questionInfo.ans" v-if="questionInfo.type == 'MultipleChoice'" multiple>
        <el-option v-for="(item, idx) in anss" :key="idx" :label="item" :value="item" />
      </el-select>
      <!-- 题目 -->
      <el-input v-model="questionInfo.topic" :autosize="textareaSize" type="textarea" placeholder="请输入题目" />
      <!-- 选项 -->
      <div>
        <span>A:</span>
        <el-input v-model="questionInfo.optionA" :autosize="textareaSize" type="textarea" placeholder="" />
      </div>
      <div>
        <span>B:</span>
        <el-input v-model="questionInfo.optionB" :autosize="textareaSize" type="textarea" placeholder="" />
      </div>
      <div v-if="questionInfo.type == 'singleChoice' || questionInfo.type == 'MultipleChoice'">
        <span>C:</span>
        <el-input v-model="questionInfo.optionC" :autosize="textareaSize" type="textarea" placeholder="" />
      </div>
      <div v-if="questionInfo.type == 'singleChoice' || questionInfo.type == 'MultipleChoice'">
        <span>D:</span>
        <el-input v-model="questionInfo.optionD" :autosize="textareaSize" type="textarea" placeholder="" />
      </div>
    </el-dialog>

    <el-dialog v-model="preview_dialog">
      <displayQuestion :questionList="previewList" :showOp="false" />
      <br>
      <template #footer>
        <el-button type="primary" @click="UPLOAD()">确定无误</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from '@/utils'
import { ElMessage } from 'element-plus'
import displayQuestion from './displayQuestion.vue'
import { read, utils } from 'xlsx'
import { SetNewQuestion } from '@/api/computer_competition'
const emit = defineEmits(['setQuestion', 'search', 'update'])

const textareaSize = { minRows: 1, maxRows: 10 }

//搜索题目
const searchValue = ref()
const getSearch = debounce(() => {
  emit('search', searchValue.value)
}, 1000)
//
const dialog = ref(false)

const set = () => {
  dialog.value = true
}
const questionInfo = ref({
  topic: '',
  type: '',
  ans: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',

})
//选择题型
const types = [
  {
    value: 'singleChoice',
    description: '单选题',
  },
  {
    value: 'MultipleChoice',
    description: '多选题',
  },
  {
    value: 'Judmental',
    description: '判断题',
  }
]
//答案
const anss = ['A', 'B', 'C', 'D']
//添加
const add = () => {
  dialog.value = false
  if (questionInfo.value.type === "MultipleChoice") {
    const a = ref("")
    if (questionInfo.value.ans.find(item => item == 'A')) {
      a.value += 'A'
    }
    if (questionInfo.value.ans.find(item => item == 'B')) {
      a.value += 'B'
    }
    if (questionInfo.value.ans.find(item => item == 'C')) {
      a.value += 'C'
    }
    if (questionInfo.value.ans.find(item => item == 'D')) {
      a.value += 'D'
    }
    questionInfo.value.ans = a.value
  }
  emit('setQuestion', questionInfo.value)
}

//上传文件
const previewList = ref([])
const preview_dialog = ref(false)
const readFile = (file) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })


}
//上传文件状态改变
async function onChange(file) {
  try {
    let dataBinary = await readFile(file.raw)
    let workBook = read(dataBinary, { type: 'binary', cellDates: true })
    let workSheet = workBook.Sheets[workBook.SheetNames[0]]
    const data = utils.sheet_to_json(workSheet)
    for (const item of ['type', 'ans', 'topic', 'optionA', 'optionB', 'optionC', 'optionD']) {
      if (!data[0][item]) {
        ElMessage({ type: 'error', message: '请按照模板规定格式！' })
        return;
      }
    }
    ElMessage({ type: 'success', message: '解析成功' })
    preview_dialog.value = true;
    previewList.value = data.map((item) => {
      const { type, ans, topic, optionA, optionB, optionC, optionD } = item
      return {
        type, ans, topic, optionA, optionB, optionC, optionD
      }
    });
  }
  catch (error) {
    preview_dialog.value = false;
    previewList.value = []
    ElMessage({ type: 'error', message: '解析失败, 请按照规定格式' })
  }
}

//
async function sleep(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}

//下载模板
function uploadTemplate() {
  const header = [{ type: 'type', ans: 'ans', topic: 'topic', optionA: 'optionA', optionB: 'optionB', optionC: 'optionC', optionD: 'optionD' }]
  const fileName = '竞赛题目.xls'
  const a = document.createElement('a')
  const result = header.map(v => {
    return Object.values(v).join('\t')
  }).join('\n')
  a.href = URL.createObjectURL(new Blob([result]))
  a.setAttribute('download', fileName)
  a.click()
}

//确认上传
const ansArray = ['A', 'B', 'C', 'D']
function mapType(type) {
  if (type == 1) return 'A'
  else if (type == 2) return 'B'
  else if (type == 3) return 'C'
}
function init(ans) {
  let idx = 0
  let res = []
  while (ans) {
    if (ans & 1) {
      res.push(ansArray[idx]);
    }
    ans >>= 1;
    idx++;
  }
  return res
}
async function UPLOAD() {
  await Promise.all(previewList.value.map(async (item, idx) => {
    let { type, ans, topic, optionA, optionB, optionC, optionD } = item
    await sleep(500)

    type = mapType(type)
    ans = init(ans)
    const res = await SetNewQuestion(
      {
        type, ans
      },
      {
        topic, optionA, optionB, optionC, optionD
      }
    )
    emit('update')
    preview_dialog.value = false
    if (res.code === 0) {
      previewList.value[idx].upload = '上传成功'
    } else {
      previewList.value[idx].upload = '上传失败' + res.message
    }
  }))
  ElMessage({ type: 'success', message: '上传完成，请查看对应题目' })
}
</script>

<style scoped>

</style>