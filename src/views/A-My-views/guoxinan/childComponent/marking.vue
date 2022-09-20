<script setup>
import { ref } from 'vue'
const showStaticGroupMark = ref(['1'])
// 下载文件
const fileDownload = (uuid) => {
  window.open(
    `/api/files?uuid=${uuid}`,
    '_blank'
  )
}
// 项目
const projects = ref([])
//静态组
const staticProjects = ref([
  {
    projectId: 1,
    name: '项目名称',
    url: 'http://yumingxi.xyz',
    type: 1,
    description: '这是项目描述',
    attachment: {
      uuid: '111'
    },
    ratings: []
  }
])
//动态组
const dynamicProjects = ref([
  {
    projectId: 2,
    name: '项目名称',
    url: 'http://yumingxi.xyz',
    type: 2,
    description: '这是项目描述',
    attachment: {
      uuid: '111'
    },
    ratings: []
  },
])
//评分项
const ratingRules = ref([
  {
    column: '内容',
    subRules: [
      {
        desc: '内容健康，积极向上，无违反国家的政策和法规',
        idx: 1,
      },
      {
        desc: '内容详细而充实，具有观赏性',
        idx: 2,
      },
      {
        desc: '网站栏目充足，内容贴近所选主题，清晰表达设计意图',
        idx: 3,
      },
    ],
  },
  {
    column: '结构',
    subRules: [
      {
        desc: '栏目设置合理，导航分明，查询方便',
        idx: 4,
      },
      {
        desc: '网站运行正常，无链接上的错误',
        idx: 5,
      },
    ],
  },
  {
    column: '美工及交互',
    subRules: [
      {
        desc: '版面简洁，整体布局美观',
        idx: 6,
      },
      {
        desc: '整体色彩和谐，适合于网站的主题',
        idx: 7,
      },
      {
        desc: '按钮、图片的制作美观、实用，文本，图案整洁美观',
        idx: 8,
      },
      {
        desc: '合理使用各类UI设计框架，人机交互友好，响应速度快',
        idx: 9,
      },
      {
        desc: '界面至少能兼容IE8以上版本、火狐、谷歌等常用浏览器',
        idx: 10,
      },
    ],
  },
  {
    column: '创意',
    subRules: [
      {
        desc: '主题明确，有新意',
        idx: 11,
      },
      {
        desc: '页面表现手法新颖，独到，有特色',
        idx: 12,
      },
      {
        desc: '网页具有与众不同的设计风格',
        idx: 13,
      },
      {
        desc: '页面特效有创意',
        idx: 14,
      },
    ],
  },
])
</script>
<template>
  <div>
    <h1>评分列表</h1>
    <h2>静态组</h2>
    <!-- 评分折叠面板 -->
    <el-collapse v-model="showStaticGroupMark">
      <el-collapse-item v-for="project in staticProjects" :key="project.projectId" title="">
        <el-card id="static_project_info">
          <el-descriptions title="项目信息" direction:vertical column="4">
            <el-descriptions-item label="名称" span="1">
              <div>{{project.name}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="部署网站" span="1">
              <div><a href="project.url"><button>访问</button></a></div>
            </el-descriptions-item>
            <el-descriptions-item label="类型">
              <div>{{project.type === 1 ? "静态" : "动态"}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="项目文件">
              <div> <button @click="fileDownload(project.attachment.uuid)">下载</button></div>
            </el-descriptions-item>
            <el-descriptions-item label="作品描述" span="1">
              <div>{{ project.description }}</div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card id="static_project_mark_detail">
          <el-descriptions title="您的评分" direction:vertical column="4">
            <el-descriptions-item v-for="rule in ratingRules" :key="rule.column" label="" span="1">
              <template #label>
                <span style="font-weight:700">{{rule.column}}</span>
              </template>
              <el-description direction:vertical>
                <el-description-item v-for="subrule in rule.subRules" :key="subrule.idx" label="">

                </el-description-item>
              </el-description>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style>
/*评分首页标题*/
/*静态组*/
/*项目信息*/
#static_project_info {
  width: 100%;
  height: 400px;
  background-color: pink;
}

.static_project_info>div {
  width: 25%;
  float: left;
}

.static_project_info>div>div {
  width: 100%;
  height: 100px;
}
</style>