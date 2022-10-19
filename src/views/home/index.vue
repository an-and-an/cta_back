
<script setup>
import { getAllRoles } from '@/api/getRouter'
import { CreateAdmin, GetAllAdmin } from '@/api/login'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const adminInfoList = ref([])
const pageInfo = ref({
  page: 1,
  pageSize: 10,
  roles: [1],
})
const getAdminInfoList = () => {
  GetAllAdmin(pageInfo.value).then(res => {
    adminInfoList.value = res.list
  })
}
getAdminInfoList()
const getNewAdminInfoList = (index) => {
  pageInfo.value.page = index
  getAdminInfoList()
}

const showAddAdminView = ref(false);

const rolesList = ref([]);
getAllRoles().then(res => {
  rolesList.value = res.data
})

const formData = ref({
  username: "",
  password: "",
  phone: "",
  roles: "",
})

const addAdminAccount = () => {
  CreateAdmin(formData.value).then(res => {
    showAddAdminView.value = false;
    if (res.code == 0)
      ElMessage({
        type: "success",
        message: res.message,
        offset: 250,
      })
    else
      ElMessage({
        type: "error",
        message: res.message,
        offset: 250,
      })
    getAdminInfoList()
  })
}

</script>

<template>
  <div>
    <div id="admin-list-top-btn-group">
      <el-button type="primary" @click="showAddAdminView=true">添加管理员</el-button>
    </div>
    <div style="width:100%">
      <el-table :data="adminInfoList" style="width: 100%" height="600">
        <el-table-column prop="avatarUrl" label="头像" width="100%">
          <template #default="scope">
            <img id="avatar-img" :src="scope.row.avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" width="120%" />
        <el-table-column prop="email" label="邮箱" width="200%" />
        <el-table-column prop="phone" label="电话" width="200%">
        </el-table-column>
        <el-table-column prop="city" label="权限" width="380%" />
        <el-table-column prop="zip" label="操作" width="200">
          <el-button type="primary" circle>
            <svg-icon name="edit" />
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div id="admin-list-footer">
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"
        @current-change="getNewAdminInfoList" />
    </div>
  </div>
  <!-- dialog -->
  <el-dialog v-model="showAddAdminView">
    <div class="create_admin_box">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="用户名" required="true">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码 " required="true">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="电话 " required="true">
          <el-input v-model="formData.phone" required="true" />
        </el-form-item>
        <el-form-item label="角色" required="true">
          <el-select v-model="formData.roles" class="m-2" placeholder="请选择管理员角色" size="large" @change="getAdminRoleId">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleDescription" :value="item.id" />
          </el-select>
        </el-form-item>
        <div style="display: flex; justify-content: center;">
          <el-button type="primary" @click="addAdminAccount" id="addBtn">添加</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<style scoped>
#admin-list-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  bottom: 20px;
  left: 0;
}

#admin-list-top-btn-group {
  display: flex;
  justify-content: flex-end;
}

#addBtn {
  width: 25%;
}

#avatar-img {
  width: 60%;
  border: 0px solid red;
  border-radius: 50%;
}
</style>