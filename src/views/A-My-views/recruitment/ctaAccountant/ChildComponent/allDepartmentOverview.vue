<script setup>
import { ref } from 'vue'
const test = true

</script>  
<template>
  <div class="basic_box" id="basic_box">
    <!-- <div class="overview_button">概览</div>
    <div class="current_accountant">本届</div>
    <div class="former_accountant">往届</div> -->
 
  </div>
</template>
<style scoped>
.demo-tabs {
  width: 500px;
  height: 500px;
}

/* .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
} */
.basic_box {
  position: relative;
  width: 1600px;
  height: auto;
}

#basic_box>div {
  /* float: left; */
  margin-right: 20px;
  width: 60px;
  height: 50px;
  border-bottom: 3px solid rgb(77, 112, 255);
  background-color: pink;
}

.overview_button {
  margin-right: 20px;
  width: 60px;
  height: 50px;
  /* border-bottom: 3px solid rgb(77, 112, 255); */
  background-color: pink;
}

.current_accountant {}
</style>