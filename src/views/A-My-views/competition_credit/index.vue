<template>
  <condition-cpm
    ref="conditionRef"
    :semester="getRecordInfo.semester"
    :group="getRecordInfo.group"
    :options="options"
    @group-change="(v: any) => {
      getRecordInfo.group = v;
      getRecord();
    }"
    @semester-change="(v: any) => {
      getRecordInfo.semester = v;
      getRecord();
    }"
    @create-btn-click="() => dialogRef!.openCreateItemDialog()"
    @upload="(data: any) => dialogRef!.openUploadDialog(data)"
    @batch-delete="() => dialogRef!.openDeleteDialog()"
  />
  <list-cpm
    ref="listRef"
    :credit-list="creditList"
    :flex-row="flexRow"
    @edit-item="(v: any) => dialogRef!.openUpdateItemDialog(v)"
    @delete-item="(id: number) => handlerDel(id)"
  />
  <dialog-cpm
    ref="dialogRef"
    :options="options"
    :compitition="flexRow"
    @create-item="createItemEvent"
    @update-item="updateItemEvent"
    @batch-delete="batchDeleteEvent"
    @upload-excel-over="getRecord"
  />
</template>
<script lang="ts" setup>
import {
  GetRecord,
  UpdateRecord,
  SetRecord,
  DeleteRecord,
  DeleteIntegralByCompititionName,
} from '@/api/competition_credit'
import { apiOver } from '@/utils/api';
import ConditionCpm from './childCpm/condition.vue';
import ListCpm from './childCpm/listV2.vue';
import DialogCpm from './childCpm/dialog.vue';
const dialogRef = ref<InstanceType<typeof DialogCpm>>();
const conditionRef = ref<InstanceType<typeof ConditionCpm>>();
const listRef = ref<InstanceType<typeof ListCpm>>();
// 获取/查询积分记录, public
const creditList = ref([]);
const flexRow = ref([]);
const date = new Date();
let currentYear = date.getFullYear();
const getRecordInfo = ref({
  semester: '',
  group: false,
});
const options = ref<string[]>([]);

async function getRecord() {
  const res: any = await GetRecord(getRecordInfo.value)
  creditList.value = res.list.map((item: any, index: any) => {
    const temp: any = {
      rank: index + 1,
      major: item.user.major,
      username: item.user.username,
      '总分': item.ans,
    }
    item.list.forEach((element: any) => {
      temp[element.competitionName] = element
    });
    return temp
  })
  
  flexRow.value = res.row
  flexRow.value.shift()
  listRef.value!.init(res.row);
}
async function createItemEvent(item: any) {
  const { status, message }: any = await SetRecord(item);
  console.log(status, message);
  apiOver(() => getRecord(), status, message);
}

async function handlerDel(id: number) {
  const { status, message }: any = await DeleteRecord(id);
  apiOver(() => getRecord(), status, message);
}
async function updateItemEvent(data: any) {
  const { id, description, integral } = data;
  const { status, message }: any = await UpdateRecord({ id, description, integral })
  apiOver(() => {
    getRecord();
    dialogRef.value!.closeUpdateItemDialog();
  }, status, message);
}
async function batchDeleteEvent(compititionName: string) {
  const { code, message }: any = await DeleteIntegralByCompititionName(compititionName)
  apiOver(() => {
    getRecord();
    dialogRef.value!.closeDeleteDialog();
  }, code, message);
}
async function init() {
  const month = date.getMonth() + 1;
  if (month < 9) {
    getRecordInfo.value.semester = `${currentYear - 1}-${currentYear}`;
    currentYear--;
  } else {
    getRecordInfo.value.semester = `${currentYear}-${currentYear + 1}`;
  }
  for (let i = 0; i < 4; i++) {
    options.value.push(`${currentYear - i}-${currentYear - i + 1}`);
  }
  getRecord()
}
init();
</script>