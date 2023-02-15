<script setup>
import { ref } from "vue";
import { SetScore } from "@/api/guoxinan";
const props = defineProps(["infoList", "type"]);
const showDynanmicGroupMark = ref("1");
//评分项
const ratingRules = ref([
  {
    column: "内容",
    subRules: [
      {
        desc: "内容健康，积极向上，无违反国家的政策和法规",
        idx: 1,
      },
      {
        desc: "内容详细而充实，具有观赏性",
        idx: 2,
      },
      {
        desc: "网站栏目充足，内容贴近所选主题，清晰表达设计意图",
        idx: 3,
      },
    ],
  },
  {
    column: "结构",
    subRules: [
      {
        desc: "栏目设置合理，导航分明，查询方便",
        idx: 4,
      },
      {
        desc: "网站运行正常，无链接上的错误",
        idx: 5,
      },
    ],
  },
  {
    column: "美工及交互",
    subRules: [
      {
        desc: "版面简洁，整体布局美观",
        idx: 6,
      },
      {
        desc: "整体色彩和谐，适合于网站的主题",
        idx: 7,
      },
      {
        desc: "按钮、图片的制作美观、实用，文本，图案整洁美观",
        idx: 8,
      },
      {
        desc: "合理使用各类UI设计框架，人机交互友好，响应速度快",
        idx: 9,
      },
      {
        desc: "界面至少能兼容IE8以上版本、火狐、谷歌等常用浏览器",
        idx: 10,
      },
    ],
  },
  {
    column: "创意",
    subRules: [
      {
        desc: "主题明确，有新意",
        idx: 11,
      },
      {
        desc: "页面表现手法新颖，独到，有特色",
        idx: 12,
      },
      {
        desc: "网页具有与众不同的设计风格",
        idx: 13,
      },
      {
        desc: "页面特效有创意",
        idx: 14,
      },
    ],
  },
]);
//评分
const itemClick = (id, idx, score) => {
  SetScore({ id, idx, score }).catch((err) => {
    console.log(err);
    ElMessage({ type: 'error', message: err.message });
  });
};
</script>
<template>
  <div class="box">
    <el-card>
      <el-collapse v-model="showDynanmicGroupMark">
        <el-collapse-item
          v-for="project in props.infoList"
          :key="project.id"
          :title="
            project.id + '&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;' + project.workName
          "
        >
          <el-descriptions title="项目信息" direction:vertical :column="3">
            <el-descriptions-item>
              <el-descriptions
                title="作品名称"
                style="min-width: 100px"
              >
                <el-descriptions-item>
                  <div style="font-size: 20px">{{ project.workName }}</div>
                </el-descriptions-item>
              </el-descriptions>
            </el-descriptions-item>

            <el-descriptions-item>
              <el-descriptions
                title="部署网站"
                style="min-width:100px"
              >
                <el-descriptions-item>
                  <div>
                    <a :href="project.websiteUrl" target="_blank"
                      ><button>访问</button></a
                    >
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </el-descriptions-item>

            <el-descriptions-item>
              <el-descriptions
                title="源代码"
                style="min-width: 100px"
              >
                <el-descriptions-item>
                  <div>
                    <a :href="project.githubUrl" target="_blank"
                      ><button>查看</button></a
                    >
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-descriptions title="作品描述类型">
                <el-descriptions-item>
                  <span :title="project.introductionToWorks" class="desc">{{
                    project.introductionToWorks
                  }}</span>
                </el-descriptions-item>
              </el-descriptions>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="您的评分" direction:vertical :column="1">
            <el-descriptions-item
              v-for="rule in ratingRules"
              :key="rule.column"
              span="1"
            >
              <template #label>
                <div style="font-size: 24px; color: black">
                  {{ rule.column }}
                </div>
              </template>
              <el-row>
                <el-col
                  v-for="subrule in rule.subRules"
                  :key="subrule.idx"
                  class="rating-item"
                  :span="8"
                >
                  <span class="demonstration">{{ subrule.desc }}</span>
                  <br />
                  <el-rate
                    v-model="project.score[subrule.idx - 1]"
                    :allow-half="true"
                    @change="(v) => itemClick(project.id, subrule.idx - 1, v)"
                  />
                </el-col>
              </el-row>
            </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<style scoped>
.box >>> .el-card__body {
  padding: 0 35px !important;
}

.desc {
  /* background-color: red !important; */
  /* width:200px !important; */
  height: auto;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>
