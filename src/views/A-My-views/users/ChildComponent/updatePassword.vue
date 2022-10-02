<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
const emit = defineEmits(['offUpdate', 'updatePassword'])
defineProps(['showUpdate', 'username'])
//关闭对话框
const off = () => {
  // console.log("点击关闭对话框啦！");
  emit('offUpdate')
}
//确认修改
const PasswardOnce = ref()
const PasswardAgain = ref()
const update = () => {
  if (PasswardOnce.value == PasswardAgain.value) {
    emit('updatePassword', PasswardOnce.value)
    off()
  } else {
    ElMessage({
      type: 'warning',
      message: '两次输入的密码不一致，请重新输入！',
      offset: 250,
      duration: 1000,
    })
  }
}
</script>
<template>
  <div>
    <el-dialog v-model="showUpdate" width="50%" @close="off">
      <!-- 确认修改 -->
      <template #footer>
        <el-button @click="update" type="primary" size="small">确认</el-button>
      </template>
      <el-form label-width="100px" label-position="left">
        <!-- 修改用户 -->
        <el-form-item label="用户" :required="true">
          <el-input v-model="username" />
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="密码 " :required="true">
          <el-input v-model="PasswardOnce" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <!-- 新密码确认 -->
        <el-form-item label="确认密码 " :required="true">
          <el-input v-model="PasswardAgain" type="password" placeholder="请再次输入密码" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

