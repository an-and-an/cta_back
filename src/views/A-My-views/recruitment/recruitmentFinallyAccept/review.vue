<script setup>
import { ref } from 'vue'
defineProps(['user', 'status', 'current_role_id'])
const emit = defineEmits(['FinallySetOfficial', 'FinallyRejectOfficial'])
const id = ref()
const department=ref()
// 录取
const showFinallySetOfficial = ref(false)
const finally_set_official = (user_id) => {
    showFinallySetOfficial.value = true
    id.value = user_id
}
const finally_set = () => {
    emit('FinallySetOfficial', id)
    showFinallySetOfficial.value = false
}
//拒绝
const finally_reject_official = (user_id,user_department) => {
    id.value = user_id
    department.value=user_department
    emit('FinallyRejectOfficial', id,department)
}
</script>
<template>
    <div class="detailInfoBox">
        <el-card>
            <div class="header">{{user.username}}&nbsp;</div>
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
            <el-button v-if="status==4 && current_role_id==21" type="primary" @click="finally_set_official(user.id,user.finallyDepartment)">录取
            </el-button>
            <el-button v-if="status==4 && current_role_id==21" type="primary" @click="finally_reject_official(user.id)">
                拒绝
            </el-button>
        </div>
        <div>
            <el-dialog v-model="showFinallySetOfficial" width="30%">
                <span>确认录取{{user.username}}同学?</span>
                <template #footer>
                    <el-button type="primary" size="small" @click="finally_set">确认</el-button>
                </template>
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

.info {
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
