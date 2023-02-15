<template>
  <div>
    <searchBox @search="getSearch" />
    <userInfoTable
      :tableInfo="allUserList"
      @deleteUser="deleteAUser"
      @update="showUpdate"
    />
    <updatePassword
      v-if="isShowComponent(ROLES_KEY.UPDATE)"
      :showUpdate="isShowUpdate"
      :username="updateUsername"
      @offUpdate="offUpdateDialog"
      @updatePassword="modigyUserPassword"
      :isShow="isShow"
    />
    <bottom
      class="pager"
      :pageTotal="total"
      :page="data.page"
      @getNewPage="getNewPage"
      @pageSizeUpdate="pageSizeUpdate"
    />
  </div>
</template>

<script setup>
import { isShowComponent, ROLES_KEY } from '@/directive/roles';
import { reactive, ref } from "vue";
import { GetAllUser, DeleteUser, UpdateUserInfo } from "@/api/user";
import searchBox from "./ChildComponent/searchBox.vue";
import userInfoTable from "./ChildComponent/userInfoTable.vue";
import bottom from "./bottom.vue";
import updatePassword from "./ChildComponent/updatePassword.vue";
import { encryptByMd5 } from "@/utils/encrypt.js";
import { ElMessage } from "element-plus";
const data = reactive({
  page: 1,
  pageSize: 10,
  content: "",
});

//获取所有用户
const total = ref();
const allUserList = ref([]);
const getAllUserInfoList = (content) => {
  data.content = content;
  GetAllUser(data).then((res) => {
    allUserList.value = res.list;
    total.value = res.total;
  });
};
getAllUserInfoList();
//搜索
const getSearch = (content) => {
  getAllUserInfoList(content);
};
//页码
const getNewPage = (page) => {
  data.page = page;
  getAllUserInfoList();
};
const pageSizeUpdate = (pageSize) => {
  data.pageSize = pageSize;
  getAllUserInfoList();
};
//修改用户信息
const isShow = ref(true);
const isShowUpdate = ref(false);
const updateId = ref();
const updateUsername = ref();
const showUpdate = (id, username) => {
  updateId.value = id;
  updateUsername.value = username;
  isShowUpdate.value = true;
};
const offUpdateDialog = () => {
  isShowUpdate.value = false;
};
const modigyUserPassword = (username, password) => {
  UpdateUserInfo({
    id: updateId.value,
    password: encryptByMd5(password),
    username: username,
  }).then((res) => {
    if (res.code === 0) {
      getAllUserInfoList();
      ElMessage({
        type: "success",
        message: "修改成功！",
        offset: 250,
        duration: 1000,
      });
    } else {
      ElMessage({
        type: "error",
        message: "修改失败，请重新修改！",
        offset: 250,
        duration: 1000,
      });
    }
  });
};
//删除
const deleteAUser = (id) => {
  DeleteUser(id).then((res) => {
    // console.log(res.code);
    if (res.code == 0) {
      getAllUserInfoList();
      ElMessage({
        type: "success",
        message: "删除成功！",
        offset: 250,
        duration: 1000,
      });
    }
  });
};
</script>

<style scoped>
.pager {
  z-index: 999;
}
</style>
