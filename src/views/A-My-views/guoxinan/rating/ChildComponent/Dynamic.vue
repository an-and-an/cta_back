<script setup>
import { ref } from 'vue'
import { SetScore, GetAllProject } from '@/api/guoxinan'
const showDynanmicGroupMark = ref('1')
const GetAllDynanmicProject = (() => {
  GetAllProject().then(res => {
    console.log('获取作品--',res.data.dynamic);
    // res.data.dynamic.forEach(item => {
    //   dynamicProjects.value.push({
    //     projectId: item.id,
    //     name: item.workName || '国信安作品',
    //     url: item.websiteUrl,
    //     type: 1,
    //     description: item.websiteIntroduction,
    //     ratings: item.score
    //   })
    // })
    
  })
})
GetAllDynanmicProject()
//动态组
const dynamicProjects = ref([])
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
//评分
const itemClick = (id, idx, score) => {
  SetScore({ id, idx, score }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}
</script>
<template>
  <el-collapse v-model="showDynanmicGroupMark">
    <el-collapse-item v-for="project in dynamicProjects" :key="project.projectId" :title="project.name">
      <el-card id=" static_project_info">
        <el-descriptions title="项目信息" direction:vertical :column="4">
          <el-descriptions-item label="名称" span="1">
            <div>{{project.name}}</div>
          </el-descriptions-item>
          <el-descriptions-item label="部署网站" span="1">
            <div><a href="project.url"><button>访问</button></a></div>
          </el-descriptions-item>
          <el-descriptions-item label="类型">
            <div>动态</div>
          </el-descriptions-item>
          <el-descriptions-item label="作品描述" span="1">
            <div>{{ project.description }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card id="static_project_mark_detail">
        <el-descriptions title="您的评分" direction:vertical :column="1">
          <el-descriptions-item v-for="rule in ratingRules" :key="rule.column" label="rule." span="1">
            <template #label>
              <div style="font-size: 24px; color: black">{{rule.column}}</div>
            </template>
            <div v-for="subrule in rule.subRules" :key="subrule.idx" class="rating-item">
              <span class="demonstration">{{ subrule.desc }}</span>
              <br>
              <br>
              <el-rate v-model="project.ratings[subrule.idx-1]" :allow-half="true"
                @change="v => itemClick(project.projectId, subrule.idx, v)" />
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-collapse-item>
  </el-collapse>
</template>
<style>

</style>