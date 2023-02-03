<template>
  <el-select
    v-model="semester"
    @change="(v: any) => emit('semesterChange', v)"
    placeholder="Select"
    size="large"
  >
    <el-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
  <el-select
    v-model="group"
    @change="(v: any) => emit('groupChange', v)"
    placeholder="Select"
    size="large"
  >
    <el-option label="A组" :value="true" />
    <el-option label="B组" :value="false" />
  </el-select>
  <el-button v-my-roles="ROLES_KEY.CREATE" type="primary" @click="UPLOADTEMPLATE">下载模板</el-button>
  <el-button v-my-roles="ROLES_KEY.DELETE" type="primary" @click="emit('batchDelete')">批量删除</el-button>
  <el-button v-my-roles="ROLES_KEY.CREATE" type="primary" @click="emit('createBtnClick')">添加</el-button>
  <div v-my-roles="ROLES_KEY.CREATE" style="display: inline-block; margin-left: 12px;">
    <el-upload
      action=""
      :limit="1"
      :on-change="onChange"
      :auto-upload="false"
      :show-file-list="false"
    >
      <template #trigger>
        <el-button type="primary">上传榜单</el-button>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ROLES_KEY } from '@/directive/roles';
import { ElMessage } from 'element-plus';
import { read, utils } from 'xlsx';
defineProps<{
  semester: string,
  group: boolean,
  options: any[],
}>();
const emit = defineEmits([
  'semesterChange',
  'groupChange',
  'createBtnClick',
  'upload',
  'batchDelete'
]);

function UPLOADTEMPLATE() {
  const header = [{
    semester: '届',
    compititionName: '周',
    rank: '排名',
    studentId: '学号',
    username: '姓名',
    integral: '积分',
    group: '组别',
    description: '获奖情况',
  }, {
    semester: '2022-2023(学年)',
    compititionName: '11(只填数字)',
    rank: 1,
    studentId: '20101080417',
    username: '余欢',
    integral: '4/3/2/1',
    group: 'A/B',
    description: '金牌/银牌/铜牌/参与奖',
  }];
  const fileName = '周赛结果.xls';
  const a = document.createElement('a');
  const result = header.map(v => Object.values(v).join('\t')).join('\n');
  a.href = URL.createObjectURL(new Blob([result]));
  a.setAttribute('download', fileName);
  a.click();
}
const readFile = (file: any) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (ev: any) => {
      resolve(ev.target.result)
    }
  })
}
async function onChange(file: any) {
  try {
    let dataBinary = await readFile(file.raw);
    let workBook = read(dataBinary, { type: 'binary', cellDates: true });
    let workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const data: any = utils.sheet_to_json(workSheet);
    emit('upload', data);
  } catch (error) {
    ElMessage({ type: 'error', message: '解析失败, 请按照规定格式' })
  }
}
</script>

<style scoped>
</style>
