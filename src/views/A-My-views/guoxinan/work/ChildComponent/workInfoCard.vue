<script setup>
const props = defineProps(['work','isGet'])
const emit = defineEmits(['audit'])
const trial = (res) => {
  emit('audit', props.work.id, res)
}
</script>
<template>
    <div class="work_info_card_box">
      <el-card  class="card" >
        <div class="image_box">
          <img :src="work.showImg" class="image" />
        </div>
        <div class="content_box">
          <span>{{work.gxaApplicationForm
          .teamName}}</span>
          <br />
          <span>{{work.gxaApplicationForm
          .workName}}</span>
          <br />
        
          <div>
            <span :title="work.websiteIntroduction" class="span_style" >{{work.websiteIntroduction}}</span>
          </div>
          <span style="margin-right:20px">
            <el-link :href="work.websiteUrl" target="_blank">查看网页</el-link>
          </span>
          <span v-if="isGet">
            <el-link :href="work.githubUrl"  target="_blank">源代码</el-link>
          </span>
          <div>
            <el-button text type="primary" @click="trial(true)">通过</el-button>
            <el-button text type="primary" @click="trial(false)">拒绝</el-button>
          </div>
        </div>
      </el-card>
    </div>
</template>
<style scoped>

.work_info_card_box{
  width: 500px;
}
.el-card__body{
  width: 100%;
  height: auto;
}

.el-card__body .content_box{
  width: 100%;
  font-size: 20px ;
  margin-top: 10px;

}                                                     

.el-card__body .content_box > div > span{
  display: block;
  width: 100%;
  height: 30px;
  font-size: 14px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis
}
.image_box{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:space-around;
}
.image{
  width: 490px;
  height: 279px;
}

</style>