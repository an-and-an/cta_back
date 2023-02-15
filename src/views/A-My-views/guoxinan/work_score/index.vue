<template>
  <div>
    <h3>
      动态组
      <el-button @click="_(true)">download</el-button>
    </h3>
    <el-table :data="dynamicList" style="width: 100%" max-height="600">
      <el-table-column fixed="left" prop="teamName" label="队伍" width="160" align="center" />
      <el-table-column label="作品" width="200px" align="center">
        <template #default="scope">
          <a :href="scope.row.websiteUrl" target="_blank">{{  scope.row.workName }}</a>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, idx) in select"
        :key="item"
        :prop="`teacher${idx + 1}`"
        :label="`teacher${idx + 1}`"
        width="100"
        align="center"
      />
      <el-table-column fixed="right" prop="avg" label="平均分" width="120px" />
    </el-table>
    <h3>
      静态组
      <el-button @click="_(false)">download</el-button>
    </h3>
    <el-table :data="staticList" style="width: 100%" max-height="600">
      <el-table-column fixed="left" prop="teamName" label="队伍" width="160" align="center" />
      <el-table-column label="作品" width="200px" align="center">
        <template #default="scope">
          <a :href="scope.row.websiteUrl" target="_blank">{{  scope.row.workName }}</a>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, idx) in select"
        :key="item"
        :prop="`teacher${idx + 1}`"
        :label="`teacher${idx + 1}`"
        width="100"
        align="center"
      />
      <el-table-column fixed="right" prop="avg" label="平均分" width="120px" />
    </el-table>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { GetAllWorkAndScore } from "@/api/guoxinan";
import { downloadObjectArrayToExcel } from '@/utils/download'
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
    // console.log(dynamicList.value);
  });
}
getAllWorkInfo();
function _(v) {
  let data;
  if (v) data = dynamicList.value
  else data = staticList.value
  downloadObjectArrayToExcel(data.map(item => {
    const res = {
      teamName: item.teamName,
      workName: item.workName,
      websiteUrl: item.websiteUrl,
      githubUrl: item.githubUrl,
    }
    for (let i = 1; i <= select.value.length; i++) {
      res[`teacher${i}`] = item[`teacher${i}`]
    }
    res.avg = item.avg;
    return res;
  }), '1.xlsx')
}
</script>
