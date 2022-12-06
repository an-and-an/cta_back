<script setup>
const props = defineProps(['work','isGet'])
const emit = defineEmits(['audit'])
const trial = (res) => {
  emit('audit', props.work.id, res)
}
</script>
<template>
  <div>
    <div class="work_info_card_box">
      <el-card :body-style="{ padding: '5px' }">
        <div class="image_box">
          <img :src="work.showImg" class="image" />
        </div>
        <div style="padding: 14px">
          <span>{{work.gxaApplicationForm
          .teamName}}</span>
          <br />
          <span>{{work.gxaApplicationForm
          .workName}}</span>
          <br />
          <!--  -->
          <div style="  overflow: hidden;text-overflow:ellipsis; white-space: nowrap;width:100%;height: auto;font-size: 18px;">
            <span :title="work.websiteIntroduction" >{{work.websiteIntroduction}}</span>
          </div>
          <span style="margin-right:20px">
            <el-link :href="work.websiteUrl" target="_blank">查看网页</el-link>
          </span>
          <span v-if="isGet">
            <el-link :href="work.githubUrl"  target="_blank">源代码</el-link>
          </span>
          <div class="bottom">
            <el-button text type="primary" @click="trial(true)">通过</el-button>
            <el-button text type="primary" @click="trial(false)">拒绝</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.work_info_card_box {
  width: 500px;
  height: auto;
}

.image_box{
  width: 490px;
  height: 490px;
}
.image_box .image {
  background-size:contain; 
  width: 490px;
  object-fit: cover;

}
</style>