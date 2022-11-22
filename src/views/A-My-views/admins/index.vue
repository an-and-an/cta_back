<template>
    <div>
        <div style="width:100%">
            <el-table :data="adminInfoList" style="width: 100%" height="600">
                <el-table-column prop="avatarUrl" label="头像" width="100px">
                    <template #default="scope">
                        <!-- {{ scope.row.avatarUrl }} -->
                        <img id="avatar-img" :src="scope.row.avatarUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="账号" width="150px" />
                <el-table-column prop="email" label="邮箱" width="180px" />
                <el-table-column prop="phone" label="电话" width="200px">
                </el-table-column>
                <!-- 筛选要展示的管理员角色 -->
                <el-table-column prop="roles.roleDescription">
                    <template #header>
                        <el-dropdown ref="dropdown1" trigger="click" placement="top-start" :hide-on-click="false">
                            <span class="el-dropdown-link">角色</span>
                            <template #dropdown>
                                <div style="width: 200px; height: 220px;">
                                    <el-checkbox-group size="small" v-model="currentCheckedAdminRolesList"
                                        @change="adminRolesInfoFilter">
                                        <el-checkbox v-for="(item, idx) in adminRolesInfoFilterOption" :key="idx"
                                            :label="item.text" :value="item.value"
                                            style="width:200px;height:25px;margin-left:7px" />
                                    </el-checkbox-group>
                                </div>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
                <!-- 搜索 -->
                <el-table-column>
                    <template #header>
                        <el-input v-model="adminListInfoSearch" @input="getadminListInfoSearch" :clearable="true"
                            resize="both" placeholder="请输入要搜索的用户" width="200px" fixed="right" suffix-icon="Search">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column align="right" width="100px" fixed="right">
                    <template #default="scope">
                        <!-- 删除管理员 -->
                        <el-button @click="deleteAdminAccount(scope.row.id, scope.row.username)" type="danger" circle
                            style="position:relative;right:50px;">
                            <div>
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </div>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="right" width="120px" fixed="right">
                    <template #header>
                        <el-button type="primary" @click="AddAdminAccountBtn" style="position:relative;right:40px">添加
                        </el-button>
                    </template>
                    <template #default="scope">
                        <!-- 修改密码 -->
                        <el-button @click="editAdminPassward(scope.row.username, scope.row.id)" type="primary" circle
                            style="position:relative;right:50px">
                            <div style="width:15px;height:15px; ">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </div>

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div id="admin-list-footer">
            <el-pagination background layout="prev, pager, next" :total="pageTotalItem" :hide-on-single-page="true"
                @current-change="getNewAdminInfoList" :page-size="20" :pager-count="15" />
        </div>
    </div>
    <!-- 添加管理员 dialog -->
    <el-dialog v-model="showAddAdminView">
        <div class="create_admin_box">
            <el-form label-width="70px" :model="formData" :rules="addrules" label-position="left">
                <el-form-item label="用户名"  prop="username">
                    <el-input v-model="formData.username" />
                </el-form-item>
                <el-form-item label="密码 " prop="password">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item label="电话 " prop="phone">
                    <el-input v-model="formData.phone" />
                </el-form-item>
                <el-form-item label="角色" prop="roles">
                    <el-select v-model="formData.roles" class="m-2" placeholder="请选择管理员角色" size="large"
                        @change="getAdminRoleId">
                        <el-option v-for="item in rolesList" :key="item.id" :label="item.roleDescription"
                            :value="item.id" />
                    </el-select>
                </el-form-item>
                <div style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="addAdminAccount">确认</el-button>
                </div>
            </el-form>
        </div>
    </el-dialog>
    <!-- 修改密码dialog -->
    <el-dialog v-model="showEditAdminPassward" width="50%">
        <!-- 确认修改 -->
        <template #footer>
            <el-button @click="modifyAdminPassward" type="primary" size="small">确认</el-button>
        </template>
        <el-form  :model="updateInfo" :rules="rules" label-width="100px" label-position="left" >
            <!-- 修改用户 -->
            <el-form-item label="用户" prop="CurrentAdminInEditUserName">
                <el-input v-model="updateInfo.CurrentAdminInEditUserName" />
            </el-form-item>
            <!-- 新密码 -->
            <el-form-item label="密码 "  prop="CurrentAdminPassward">
                <el-input v-model="updateInfo.CurrentAdminPassward" type="password" placeholder="请输入新密码" show-password />
            </el-form-item>
            <!-- 新密码确认 -->
            <el-form-item label="确认密码 "  prop="CurrentAdminPasswardAgain">
                <el-input v-model="updateInfo.CurrentAdminPasswardAgain" type="password" placeholder="请再次输入密码" />
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 删除管理员dialog -->
    <el-dialog v-model="showDeleteAdminAccount" width="50%">
        <span>确认删除管理员{{ deleteAdminInfo.account }}</span>
        <template #footer>
            <el-button @click="ComfirmToDeleteAdminAccount" type="primary" size="small">确认</el-button>
        </template>
    </el-dialog>

</template>

<script setup>
import { getAllRoles } from '@/api/getRouter'
import { CreateAdmin, GetAllAdmin, SetAdminPassword, DeleteAdmin } from '@/api/login'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { encryptByMd5 } from '@/utils/encrypt.js'

const adminInfoList = ref([])
const pageInfo = ref({
    page: 1,
    pageSize: 20,
})
const pageTotalItem = ref(1)
const pageCount = ref(1)
//筛选要展示的管理员角色
const adminRolesInfoFilterOption = ref([])
const currentCheckedAdminRolesList = ref([])
//搜索框输入内容
const adminListInfoSearch = ref("")
const getAdminInfoList = async (roles = adminRolesInfoFilterOption.value.map(item => item.value)) => {
    const res = await GetAllAdmin({
        ...pageInfo.value,
        roles,
        username: adminListInfoSearch.value
    })
    adminInfoList.value = res.list
    pageTotalItem.value = res.total
    pageCount.value = res.page
}
const getadminListInfoSearch = () => {
    getAdminInfoList()
}
//换页
const getNewAdminInfoList = (index) => {
    pageInfo.value.page = index
    getAdminInfoList()
}

const showAddAdminView = ref(false);
const rolesList = ref([]);
getAllRoles().then(res => {
    rolesList.value = res.data.filter(item => ![26, 27, 28].includes(item.id))
    adminRolesInfoFilterOption.value = res.data.map(item => ({ value: item.id, text: item.roleDescription }))
    getAdminInfoList()
})

const formData = reactive({
    username: "",
    password: "",
    phone: "",
    roles: "",
})
//
const addrules = reactive({
    username:
    [
      { required: true, message: '请输入用户名！', trigger: 'blur' }
    ],
    password:
    [
      { required: true, message: '请输入密码！', trigger: 'blur' }
    ],
    phone:
    [
      { required: true, message: '请输入电话!', trigger: 'blur' }
        ],
    roles:
    [
      { required: true, message: '请选择管理员角色!', trigger: 'blur' }
    ],
})
const rules = reactive({
    CurrentAdminInEditUserName:
    [
      { required: true, message: '请输入用户名！', trigger: 'blur' }
    ],
    CurrentAdminPassward:
    [
      { required: true, message: '请输入密码！', trigger: 'blur' }
    ],
    CurrentAdminPasswardAgain:
    [
      { required: true, message: '请再次输入密码!', trigger: 'blur' }
    ],
})
//添加管理员
const AddAdminAccountBtn = () => {
    showAddAdminView.value = true

}
const addAdminAccount = () => {
    formData.password = encryptByMd5(formData.password)
    CreateAdmin(formData).then(res => {
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
    }).catch(err => {
        console.log(err);
    })
}
const dropdown1 = ref()
const adminRolesInfoFilter = async (...args) => {
    const _1 = currentCheckedAdminRolesList.value.map(i => adminRolesInfoFilterOption.value.find(j => j.text === i).value);
    getAdminInfoList(_1)
}
//修改密码
//修改密码的对话框是否显示
let showEditAdminPassward = ref(false)
const updateInfo = reactive({
    CurrentAdminInEditUserName: '',
    CurrentAdminPassward: '',
    CurrentAdminPasswardAgain:''
})
let CurrentAdminInEditUserId = ref()
const editAdminPassward = (username, id) => {
    showEditAdminPassward.value = true
    CurrentAdminInEditUserId.value = id
    CurrentAdminInEditUserName.value = username
}
//修改完成，点击确认
const modifyAdminPassward = () => {
    //关闭对话框
    showEditAdminPassward.value = false
    //输入的两次密码一致
    if (CurrentAdminPassward.value == CurrentAdminPasswardAgain.value) {
        SetAdminPassword({
            password: encryptByMd5(CurrentAdminPassward.value),
            id: CurrentAdminInEditUserId.value
        }).then(res => {
            //修改成功
            if (res.code == 0)
                ElMessage({
                    type: "success",
                    message: res.message,
                    offset: 250,
                    duration: 2000,
                })
            //修改失败
            else
                ElMessage({
                    type: "error",
                    message: res.message,
                    offset: 250,
                    duration: 2000,
                })
        })
    }
    //输入的两次密码不一致 
    else {
        ElMessage({
            type: "error",
            message: "输入的密码不一致，请重新输入！",
            offset: 250,
            duration: 2000,
        })
    }
}
//删除管理员
let showDeleteAdminAccount = ref(false)
const deleteAdminInfo = ref({
    id: "",
    account: "",
})
const deleteAdminAccount = (admin_id, admin_account) => {
    showDeleteAdminAccount.value = true
    deleteAdminInfo.value.id = admin_id
    deleteAdminInfo.value.account = admin_account
}
const ComfirmToDeleteAdminAccount = () => {
    DeleteAdmin(deleteAdminInfo.value.id).then(res => {
        showDeleteAdminAccount.value = false
        if (res.code == 0)
            ElMessage({
                type: "success",
                message: res.message,
                offset: 250,
                duration: 2000,
            })
        else
            ElMessage({
                type: "error",
                message: res.message,
                offset: 250,
                duration: 2000,
            })
        getAdminInfoList()
    })

}

</script>
    
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