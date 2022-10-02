<script setup>
import { ref } from 'vue'
import { GetAllDepartment } from '@/api/recruitment'
defineProps(['user', 'status', 'current_role_id','loading'])
const emit = defineEmits(['audit', 'change_status', 'setOfficial', 'FinallySetOfficial', 'reject_set'])
const audit = (id, res) => {
    emit('audit', id, res)
}
const change_status = () => {
    emit('change_status', 1)
}
//获取所有部门
const allDepartment = ref([])
const getGepartments = (() => {
    GetAllDepartment().then(res => {
        Object.keys(res.data).forEach(val => {
            allDepartment.value.push(res.data[val])
        })
    }).catch(err => {
        console.log(err);
    })
})
getGepartments()
//预录取
const showSetOfficial = ref(false)
const showIsSet = ref(false)
const department = ref()
const id = ref()
const set_official = (user_id) => {
    showSetOfficial.value = true
    id.value = user_id
}
const isSet = () => {
    showIsSet.value = true
}
const set = () => {
    showIsSet.value = false
    showSetOfficial.value = false
    emit('setOfficial', department, id)
}
//拒绝
const showRejectSet = ref(false)
// 录取
const showFinallySetOfficial = ref(false)
const finally_set_official = (user_id) => {
    showFinallySetOfficial.value = true
    id.value = user_id
}
const finally_set = () => {
    console.log();
    showFinallySetOfficial.value = false
    emit('FinallySetOfficial', id)
}
</script>
<template>
    <div class="detailInfoBox">
        <el-card  v-loading="loading">
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
        <div class="first_trial_icon" v-if="status == 1">
            <!-- 通过初筛 -->
            <img @click="audit(user.id, true)" src="@/assets/svg/pass.svg" alt=""
                style="width: 50px;aspect-ratio: 1 / 1; margin-right: 150px">
            <!-- 没有通过初筛 -->
            <img @click="audit(user.id, false)" src="@/assets/svg/unpass.svg" alt=""
                style="width: 50px;aspect-ratio: 1 / 1; margin-left: 150px">
        </div>
        <div v-else style="display: flex; flex-direction: row;justify-content:center;margin-top:30px">
            <img v-if="status==2" src="@/assets/svg/pass2.svg" alt="" class="res_first_trial">
            <img v-if="status==3" src="@/assets/svg/fail_pass.svg" alt="" class="res_first_trial">
        </div>
        <div class="bottom_button" id="bottom_button">
            <el-button v-if="status==3" type="primary" @click="change_status">重新审核</el-button>
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
    width: 100%;
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
</style>
