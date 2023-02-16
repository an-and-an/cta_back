<template>
  <div>
    <el-button @click="download" type="primary">下载</el-button>
    <el-button @click="setFinally" type="primary">一键设置决赛名单</el-button>
    <el-button @click="withdrawFinally" type="primary">一键撤回决赛名单</el-button>
    <list-cpm :list="dynamicList" :select="select" :group="true" />
    <list-cpm :list="staticList" :select="select" :group="false" />
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { GetAllWorkAndScore } from "@/api/guoxinan";
import { downloadObjectArrayToExcel } from '@/utils/download';
import listCpm from './list.vue';

//获取所有作品和作品分数
const workInfo = ref();
const dynamicList = ref([]);
const staticList = ref([]);
const select = ref([]);
function getAllWorkInfo() {
  GetAllWorkAndScore().then((res) => {
    select.value = res.data.teachers;
    dynamicList.value = res.data.dynamicList;
    staticList.value = res.data.staticList;
  });
}

async function setFinally() {
  try {
    await setFinallyList();
  } catch (err) {
    console.log(err.message);
  }
}
async function withdrawFinally() {
  try {
    await withdrawFinallyList();
  } catch (err) {
    console.log(err.message);
  }
}
getAllWorkInfo();
function download() {
  let data = [...dynamicList.value, ...staticList.value];
  console.log(data);
  downloadObjectArrayToExcel(data.map(item => {
    const res = {
      '队伍名': item.teamName,
      '作品名': item.workName,
      '网址': item.websiteUrl,
      'git地址': item.githubUrl,
      '组别': item.group ? '动态' : '静态',
    }
    for (let i = 1; i <= select.value.length; i++) {
      res[`老师${i}`] = item[`teacher${i}`]
    }
    res['平均分'] = item.avg;
    return res;
  }), '决赛名单.xlsx')
}
</script>
