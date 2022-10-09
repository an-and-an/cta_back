<script setup>
const props = defineProps(['work'])
const emit=defineEmits(['audit'])
const trial = (res) => {
  emit('audit',props.work.id,res)
}
</script>
<template>
  <div>
    <div class="work_info_card_box">
      <el-card :body-style="{ padding: '5px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image" />
        <div style="padding: 14px">
          <span>{{work.gxaApplicationForm
          .teamName}}</span>
          <br />
          <span>{{work.gxaApplicationForm
          .workName}}</span>
          <br />
          <span>Yummy hamburger</span>
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
}

.image {
  width: 490px;
  height: 275px;

}
</style>