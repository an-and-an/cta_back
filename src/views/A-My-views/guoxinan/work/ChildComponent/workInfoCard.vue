<script setup>
import { GXA_STATUS } from "@/enum/gxa";
defineProps(["work", "isGet"]);
const emit = defineEmits(["audit"]);
</script>
<template>
  <div class="work_info_card_box">
    <el-card class="card">
      <div class="image_box">
        <img :src="work.indexHmtlImg" class="image" />
      </div>
      <div class="content_box">
        <span>{{ work.teamName }}</span>
        <br />
        <span>{{ work.workName }}</span>
        <br />
        <div>
          <span :title="work.introductionToWorks" class="span_style">{{
            work.introductionToWorks
          }}</span>
        </div>
        <span style="margin-right: 20px">
          <el-link :href="work.websiteUrl" target="_blank">查看网页</el-link>
        </span>
        <span v-if="isGet">
          <el-link :href="work.githubUrl" target="_blank">源代码</el-link>
        </span>
        <div>
          <el-button
            v-if="work.status === GXA_STATUS.WORK"
            text
            type="primary"
            @click="() => emit('audit', work.id, true)"
            >审核通过</el-button
          >
          <el-button
            v-if="work.status === GXA_STATUS.APPROVE"
            text
            type="danger"
            @click="() => emit('audit', work.id, false)"
            >打回</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
.work_info_card_box {
  width: 500px;
}
.el-card__body {
  width: 100%;
  height: auto;
}

.el-card__body .content_box {
  width: 100%;
  font-size: 20px;
  margin-top: 10px;
}

.el-card__body .content_box > div > span {
  display: block;
  width: 100%;
  height: 30px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.image_box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.image {
  width: 490px;
  height: 279px;
}
</style>
