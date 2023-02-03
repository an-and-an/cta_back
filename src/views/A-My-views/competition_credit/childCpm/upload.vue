<template>
  <el-dialog v-model="dialog" top="5vh" :before-close="handleClose" :width="900">
    <list-cpm :list="list" :select="select" :max-height="height" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="uploadExcel">
          确定上传
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { SetRecord } from '@/api/competition_credit';
import ListCpm from '@/components/common/list/index.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
const emit = defineEmits(['uploadExcelOver']);
const list = ref<any>([]);
const height = document.body.clientHeight - 250;
const dialog = ref(false);
const select = [
  {
    label: '届',
    prop: 'semester',
    width: 100,
  },
  {
    label: '比赛名称',
    prop: 'compititionName',
    width: 80,
  },
  {
    label: '排名',
    prop: 'rank',
    width: 80,
  },{
    label: '学号',
    prop: 'studentId',
    width: 120,
  },{
    label: '姓名',
    prop: 'username',
    width: 100,
  },{
    label: '积分',
    prop: 'integral',
    width: 60,
  },{
    label: '组别',
    prop: 'group',
    width: 80,
  },{
    label: '获奖情况',
    prop: 'description',
    width: 100,
  },{
    label: '上传情况',
    prop: 'ERROR_MESSAGE',
    width: 100,
  }
]
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => done())
    .catch(() => {})
}
function open(data: any) {
  dialog.value = false;
  list.value = data.map((item: any) => ({
    semester: item['届'],
    compititionName: `第${item['周']}周`,
    studentId: item['学号'],
    rank: item['排名'],
    username: item['姓名'],
    integral: item['积分'],
    group: item['组别'] + '组',
    description: item['获奖情况'],
    ERROR_MESSAGE: '等待上传',
  }));
  dialog.value = true;
}
async function sleep(timer: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
async function uploadExcel() {
  await list.value.map(async (item: any, idx: number) => {
    const { semester, compititionName, integral, description, group, studentId } = item;
    const { code, message }: any = await SetRecord({
      semester,
      compititionName,
      description,
      studentId,
      group: group === 'A组',
      integral: Number(integral),
    });
    if (code === 0) list.value[idx].ERROR_MESSAGE = '上传成功';
    else list.value[idx].ERROR_MESSAGE = '上传失败' + message;
    await sleep(500);
  })
  ElMessage({ type: 'success', message: '以上传完成，请检查数据' })
  emit('uploadExcelOver');
}
function close() {
  dialog.value = false;
  list.value = [];
}
defineExpose({
  open,
  close,
})

</script>

<style scoped>

</style>
