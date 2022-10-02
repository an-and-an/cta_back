<script setup>
import { ref } from 'vue'
import { GetUserinfo, UpdateSelfInfo } from '@/api/login'
import { ElMessage } from 'element-plus'
import Img from '@/assets/img/personalCenter_user.png'
const currentUser = ref({
  "id": "",
  "username": "",
  "avatarUrl": "",
  "email": "",
  "phone": "",
  "roles": "",
})
GetUserinfo().then(res => {
  currentUser.value = res.data
  console.log(" currentUser.value --", currentUser.value)

  //用户昵称
  // console.log(res.data.nickName);
})
//更新信息
const updateInfo = () => {
  UpdateSelfInfo({
    password: newPassword.value,
    avatarUrl: currentUser.value.avatarUrl,
    email: currentUser.value.email,
    phone: currentUser.value.phone,
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
//修改头像
const avatarUrl = ref("")
const isShowChangeAvatar = ref(false)
const successfullyUploadAvater = (res) => {
  avatarUrl.value = res.data[0].Host + "/" + res.data[0].RelativePath
  currentUser.value.avatarUrl = avatarUrl.value
  console.log("currentUser.value.avatarUrl--", currentUser.value.avatarUrl);
  updateInfo()
}
//修改电话
const newPhone = ref()
const showModifyBondPhone = ref(false)
const modifyBondPhone = () => {
  showModifyBondPhone.value = true
}
const modifyBondPhone_confirm = () => {
  currentUser.value.phone = newPhone
  showModifyBondPhone.value = false
  updateInfo()
  //console.log("currentUser", currentUser.value.phone)
}
// 修改邮箱
const newEmail = ref()
const showModifyBondEmail = ref(false)
const modifyBondEmail = () => {
  showModifyBondEmail.value = true
}
const modifyBondEmail_confirm = () => {
  currentUser.value.email = newEmail
  showModifyBondEmail.value = false
  console.log("currentUser--email--", currentUser.value.email);
  updateInfo()
}
//修改密码
const newPassword = ref()
const showModifyBondPassword = ref(false)
const modifyBondPassword = () => {
  showModifyBondPassword.value = true
}
const modifyBondPassword_confirm = () => {
  showModifyBondPassword.value = false
  updateInfo()
}

</script>
<template>
  <div>
    <!-- 侧边 -->
    <div id="personal_center_aside" class="inline-flex">
      <!-- 头像 -->
      <div id="personal_center_avater_region" @mouseenter="isShowChangeAvatar = true"
        @mouseleave="isShowChangeAvatar = false">
        <div id="personal-avatar-container">
          <img :src="currentUser.avatarUrl" alt="用户头像" id="personal_center_avater">
          <div v-if="isShowChangeAvatar" id="modify_avater_mask">
            <el-upload action="https://yibindfxy.top:444/application/upload/file" :show-file-list="false"
              :on-success="successfullyUploadAvater" name="file[]">
              <div>
                <span style="color: white; font-size: 28px;">上传头像</span>
              </div>
            </el-upload>
          </div>
        </div>
        <!-- 修改头像 -->
        <span id="personal_center_avater_username">{{currentUser.type ? currentUser.username :
        currentUser.nickName}}</span>
        <div id="personal_center_avater_bababa">这个家伙很懒，什么都没有留下</div>
      </div>

      <!-- -- -->
      <div id="personal_center_aside_text">
        <!-- 用户 -->
        <div id="personal_center_aside_userroles">
          <div id="personal_center_icon_user"><img style="width: 25px;" :src="Img" alt="用户">
          </div>
          <div id="personal_center_icon_roles">{{currentUser.roles.roleDescription}}</div>
        </div>
        <!-- 协会 -->
        <div id="personal_center_aside_userroles">
          <div id="personal_center_icon_user"><img style="width: 25px;" :src="Img" alt="协会">
          </div>
          <div id="personal_center_icon_roles">计算机技术协会</div>
        </div>
        <!-- 地址 -->
        <div id="personal_center_aside_userroles">
          <div id="personal_center_icon_user"><img style="width: 25px;" :src="Img" alt="协会">
          </div>
          <div id="personal_center_icon_roles">四川轻化工大学</div>
        </div>
      </div>
    </div>
    <!-- 版心 -->
    <div id="personal_center_content">
      <div id="personal_center_content_top">
        <span id="personal_center_content_top_title">账号绑定</span>
      </div>
      <div id="personal_center_content_main">
        <div id="personal_center_content_main_one">
        </div>
        <!-- 绑定信息 -->
        <div id="personal_center_content_main_two">
          <!-- 手机号 -->
          <div id="prsonal_bond_info_phone">
            <div>密保手机</div>
            <p id="prsonal_bond_info_phone_d">已绑定手机：{{ currentUser.phone}}
              <button @click="modifyBondPhone" id="prsonal_bond_phone_info_btn">立即修改</button>
            </p>
          </div>
          <!-- 修改手机号 -->
          <el-dialog width="35%" v-model="showModifyBondPhone">
            <template #footer>
              <el-button @click="modifyBondPhone_confirm" type="primary" size="small">确认</el-button>
            </template>
            <el-form>
              <el-form-item label="手机号 ">
                <el-input v-model="newPhone" placeholder="请输入新的手机号" />
              </el-form-item>

            </el-form>
          </el-dialog>
          <!-- 邮箱 -->
          <div id="prsonal_bond_info_email">
            <div>邮箱</div>
            <p id="prsonal_bond_info_email_d">已绑定邮箱：{{ currentUser.email}}
              <button @click="modifyBondEmail" id="prsonal_bond_email_info_btn">立即修改</button>
            </p>
          </div>
          <!-- 修改邮箱 -->
          <el-dialog width="35%" v-model="showModifyBondEmail">
            <template #footer>
              <el-button @click="modifyBondEmail_confirm" type="primary" size="small">确认</el-button>
            </template>
            <el-form>
              <el-form-item label="邮箱 ">
                <el-input v-model="newEmail" placeholder="请输入新的邮箱" />
              </el-form-item>
            </el-form>
          </el-dialog>
          <!-- 修改密码 -->
          <div id="prsonal_bond_info_password" v-if="!currentUser.type">
            <div>修改密码</div>
            <p id="prsonal_bond_info_password_d">修改个人密码
              <button @click="modifyBondPassword" id="prsonal_bond_password_info_btn">立即修改</button>
            </p>
          </div>
          <!-- 修改密码 -->
          <el-dialog width="35%" v-model="showModifyBondPassword">
            <template #footer>
              <el-button @click="modifyBondPassword_confirm" type="primary" size="small">确认</el-button>
            </template>
            <el-form>
              <el-form-item label="密码 ">
                <el-input v-model="newPassword" placeholder="请输入新的密码" />
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}

#personal_center_aside {
  float: left;
  margin-top: 30px;
  margin-right: 50px;
  width: 18%;
  min-width: 300px;
  height: 540px;
  box-shadow: -2px 0 20px -16px;
}

/*头像区域*/
#personal_center_avater_region {
  position: relative;
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

#personal-avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: auto;
}

/*头像*/
#personal_center_avater {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

#modify_avater_mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

/**/
#personal_center_avater_username {

  top: 170px;
  width: 100%;
  text-align: center;
  font-size: 35px;
  font-weight: 700;
}

#personal_center_avater_bababa {

  top: 210px;
  width: 100%;
  height: 30px;
  text-align: center;
  color: rgb(153, 154, 170);
  font-size: 17px;
  z-index: 3;

}

/*左侧栏*/
#personal_center_aside_userroles {
  position: relative;
  width: 100%;
  height: 50px;
}

/*1*/
#personal_center_icon_user {
  float: left;
  width: 45px;
  font-size: 35px;

}

#personal_center_icon_roles {
  float: left;
  font-size: 18px;
  color: rgb(153, 154, 170);
}

/*2*/

#personal_center_aside_text {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 20px;
  width: 90%;
  height: 410px;
}

/*版心*/
#personal_center_content {
  float: left;
  margin-top: 30px;
  margin-left: 2%;
  width: 65%;
  min-width: 500px;
  height: 500px;
}

/*账号绑定*/
#personal_center_content_top_title {
  position: relative;
  top: 10px;
  font-size: 14px;
  color: rgb(77, 112, 255);
}

/*账号绑定下面的短线*/
#personal_center_content_main_one {
  margin-top: 15px;
  width: 60px;
  height: 25px;
  border-top: 3px solid rgb(77, 112, 255);
  z-index: 2;
}

/*账号绑定*/
/*账号绑定--手机号*/
#prsonal_bond_info_phone {
  position: relative;
  width: 100%;
  height: 30px;
  color: rgb(118, 118, 110);
  font-size: 25px;
  line-height: 30px;
}

#prsonal_bond_info_phone_d {
  position: absolute;
  float: left;
  margin-top: 10px;
  width: 85%;
  height: 20px;
  color: rgb(153, 154, 170);
  font-size: 15px;
}

#prsonal_bond_phone_info_btn {
  position: absolute;
  right: -12%;
  border: none;
  color: rgb(77, 112, 255);
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}

/*账号绑定--邮箱*/
#prsonal_bond_info_email {
  position: relative;
  top: 100px;
  width: 100%;
  height: 30px;
  color: rgb(118, 118, 110);
  font-size: 25px;
  line-height: 30px;
}

#prsonal_bond_info_email_d {
  position: absolute;
  float: left;
  margin-top: 10px;
  width: 85%;
  height: 20px;
  color: rgb(153, 154, 170);
  font-size: 15px;
}

#prsonal_bond_email_info_btn {
  position: absolute;
  right: -12%;
  border: none;
  color: rgb(77, 112, 255);
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}

/*修改密码*/
#prsonal_bond_info_password {
  position: relative;
  top: 200px;
  width: 100%;
  height: 30px;
  color: rgb(118, 118, 110);
  font-size: 25px;
  line-height: 30px;
}

#prsonal_bond_info_password_d {
  position: absolute;
  float: left;
  margin-top: 10px;
  width: 85%;
  height: 20px;
  color: rgb(153, 154, 170);
  font-size: 15px;
}

#prsonal_bond_password_info_btn {
  position: absolute;
  right: -12%;
  border: none;
  color: rgb(77, 112, 255);
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}
</style>