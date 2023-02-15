<template>
  <div v-if="isShow">
    <el-dialog v-model="showUpdate" width="50%" @close="off">
      <template #footer>
        <el-button @click="update" type="primary" size="small">确认</el-button>
      </template>
      <el-form label-width="100px" label-position="left" :rules="rules" :model="obj">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="obj.user" />
        </el-form-item>
        <el-form-item label="密码 " prop="PasswardOnce">
          <el-input v-model="obj.PasswardOnce" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码 " prop="PasswardAgain">
          <el-input v-model="obj.PasswardAgain" type="password" placeholder="请再次输入密码" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { reactive, watch } from 'vue'
const emit = defineEmits(['offUpdate', 'updatePassword'])
const props = defineProps(['showUpdate', 'username', 'isShow'])
//关闭对话框
const off = () => {
  emit('offUpdate')
}
//确认修改
const update = () => {
  if (obj.PasswardOnce == obj.PasswardAgain) {
    emit('updatePassword', obj.user, obj.PasswardOnce)
    off()
  }
  else {
    ElMessage(
      {
        type: 'warning',
        message: '两次输入的密码不一致，请重新输入！',
        offset: 250,
        duration: 1000,
      }
    )
  }
}
//表单验证
const obj = reactive(
  {
    PasswardAgain: '',
    user: '',
    PasswardOnce: '',
  }
)
const rules = reactive({
  user:
    [
      { required: true, message: '请输入用户名！', trigger: 'blur' }
    ],
  PasswardOnce:
    [
      { required: true, message: '请输入密码！', trigger: 'blur' }
    ],
  PasswardAgain:
    [
      { required: true, message: '请再次输入密码!', trigger: 'blur' }
    ],
})
watch(() => props.username, (n, o) => {
  obj.user = n
})
</script>


