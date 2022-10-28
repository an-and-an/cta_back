<script setup>
import { ref } from 'vue'
defineProps(['user', 'status', 'current_role_id'])
const emit = defineEmits(['retract'])

// 打回
const id = ref()
const department = ref()
const showIsRetract = ref(false)
const retractAccept = (user_id, user_department) => {
  id.value = user_id
  department.value = user_department
  showIsRetract.value = true
}
const comfirmRetract = () => {
  emit('retract', id, department)
}
</script>
<template>
  <div class="detailInfoBox">
    <el-card>
      <div class="header">{{ user.username }}&nbsp;</div>
      <table class="info">
        <tr>
          <td class="label">
            <div class="cell-item">
              <el-icon>
                <User />
              </el-icon>姓名
            </div>
          </td>
          <td class="content">
            <div>{{ user.username }}</div>
          </td>
          <td class="label">
            <div class="cell-item">
              <el-icon>
                <Male />
              </el-icon>性别
            </div>
          </td>
          <td class="content">
            <div>{{ user.gender ? '女' : '男' }}</div>
          </td>
          <td rowspan="2" class="label">
            <div class="cell-item">
              <el-icon>
                <Picture />
              </el-icon>一寸照
            </div>
          </td>
          <td rowspan="2" style="padding: 0;">
            <img class="inchPhoto" :src="user.inchPhoto" alt="">
          </td>
        </tr>
        <tr>
          <td class="label">
            <div class="cell-item">
              <el-icon>
                <TrophyBase />
              </el-icon>专业
            </div>
          </td>
          <td class="content"> {{ user.major }}</td>
          <td class="label">
            <div class="cell-item">
              <el-icon>
                <DataAnalysis />
              </el-icon>班级
            </div>
          </td>
          <td class="content"> {{ user.class }}</td>
        </tr>
        <tr>
          <td class="label">
            <div class="cell-item">
              <el-icon>
                <Aim />
              </el-icon>第一志愿
            </div>
          </td>
          <td class="content">{{ user.firstChoice }}</td>
          <td class="label">
            <div class="cell-item">
              <el-icon>
                <Star />
              </el-icon>第二志愿
            </div>
          </td>
          <td class="content">{{ user.secondChoice }}</td>
          <td class="label">
            <div class="cell-item" style="width:100px">
              是否服从调剂
            </div>
          </td>
          <td class="content">{{ user.isAdjust ? '服从调剂' : '拒绝调剂' }}</td>
        </tr>
        <tr>
          <td class="label">
            <div class="cell-item">
              个人简历
            </div>
          </td>
          <td colspan="5" class="content">
            <div class="text-area">
              {{ user.curriculumVitae }}
            </div>
          </td>
        </tr>
        <tr>
          <td class="label">
            <div class="cell-item">
              竞选理由
            </div>
          </td>
          <td colspan="5" class="content">
            <div class="text-area">
              {{ user.reasonsForElection }}
            </div>
          </td>
        </tr>
      </table>
    </el-card>
    <div class="bottom_button" id="bottom_button">
      <el-button v-if="status == 4 && current_role_id == 21 && current_role_id == 9" type="primary"
        @click="retractAccept(user.id, user.department)">
        打回
      </el-button>
    </div>
    <div>
      <el-dialog v-model="showIsRetract">
        <template #footer>
          <el-button type="primary">确定</el-button>
        </template>
        444
      </el-dialog>
    </div>
  </div>
</template>
<style scoped>
.header {
  text-align: start;
  font-weight: 800;
}

.detailInfoBox {
  width: 100%;
}

.first_trial_icon {
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: none;
}

/*初筛*/
.res_first_trial {
  position: absolute;
  top: 130px;
  right: 20px;
  width: 70px;
  aspect-ratio: 1 / 1;
  transform: rotate(80deg);
}

.inchPhoto {
  width: 100px;
  aspect-ratio: 5 / 7;
}

.cell-item {
  display: flex;
  justify-content: center;
  width: 100px;
  line-height: 100%;
}

.text-area {
  white-space: pre-wrap;
  text-align: start;
  min-height: 7rem;
}


table,
th,
td {
  border: 1px solid #EBEEF5;
}

td {
  padding: 15px;
}

.content {
  font-size: 14px;
  font-weight: 400;
  width: 120px;
}

.label {
  background-color: #F5F7FA;
  font-weight: 700;
  color: #606266;
  font-size: 14px;
}

table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #EBEEF5;
}

/* 底部按钮 */
.bottom_button {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* 预录取 */
.acceptDepartmentOption {
  width: 100%;

}
</style>
