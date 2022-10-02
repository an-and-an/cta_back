<template>
  <div class="box">
    <div class="userinfo">
      <img :src="props.userInfo.avatarUrl" alt="" class="avatar">
      <span>{{ getUserInfo(props.userInfo) }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['userInfo'])
function getUserInfo(user) {
  return `${user.username}: ${user.major}${user.class}`
}
</script>
<style scoped>
.box {
  margin: 20px 0 20px 100px;
  display: flex;
  line-height: 80px;
  min-width: 1200px;
}

.avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 20px;
}


.userinfo {
  flex: 5;
}
</style>