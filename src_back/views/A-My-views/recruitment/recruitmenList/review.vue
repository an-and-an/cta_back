<script setup>
import { defineEmit, defineProps } from 'vue';
defineProps(['user', 'status'])
const emit = defineEmit(['audit'])

const audit = (id, res) => {
    emit('audit', id, res)

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
                            <!-- <el-icon>
                            <User />
                        </el-icon>姓名 -->
                            姓名
                        </div>
                    </td>
                    <td class="content">
                        <div>{{ user.username }}</div>
                    </td>
                    <td class="label">
                        <div class="cell-item">
                            <!-- <el-icon>
                            <Male />
                        </el-icon>性别 -->
                            性别
                        </div>
                    </td>
                    <td class="content">
                        <div>{{ user.gender ? '女' : '男' }}</div>
                    </td>
                    <td rowspan="2" class="label">
                        <div class="cell-item">
                            <!-- <el-icon>
                            <Picture />
                        </el-icon>一寸照 -->
                            一寸照
                        </div>
                    </td>
                    <td rowspan="2" style="padding: 0;">
                        <img class="inchPhoto" :src="user.inchPhoto" alt="">
                    </td>
                </tr>
                <tr>
                    <td class="label">
                        <div class="cell-item">
                            专业
                        </div>
                    </td>
                    <td class="content"> {{ user.major }}</td>
                    <td class="label">
                        <div class="cell-item">
                            班级
                        </div>
                    </td>
                    <td class="content"> {{ user.class }}</td>
                </tr>
                <tr>
                    <td class="label">
                        <div class="cell-item">
                            第一志愿
                        </div>
                    </td>
                    <td class="content">{{ user.firstChoice }}</td>
                    <td class="label">
                        <div class="cell-item">
                            第二志愿
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
        <div class="first_trial_icon" v-if="status == 0">
            <img @click="audit(user.id, true)" src="@/assets/svg/pass.svg" alt=""
                style="width: 50px;aspect-ratio: 1 / 1; margin-right: 150px">
            <img @click="audit(user.id, false)" src="@/assets/svg/unpass.svg" alt=""
                style="width: 50px;aspect-ratio: 1 / 1; margin-left: 150px">
        </div>
        <div v-else style="display: flex; flex-direction: row;justify-content:center;margin-top:30px">
            <img v-if="status==1" src="@/assets/svg/pass2.svg" alt="" class="res_first_trial">
            <img v-else src="@/assets/svg/fail_pass.svg" alt="" class="res_first_trial">
            <img src="@/assets/svg/resubmit.svg" alt="" style="width: 50px;aspect-ratio: 1 / 1;" @click="change_status">
        </div>
    </div>

</template>
<style scoped>
.header {
    /* background-color: red; */
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
    top: 120px;
    right: 0px;
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
    margin-top: 20px;
}

.cell-item {
    display: flex;
    justify-content: center;
    width: 100px;
    line-height: 100%;
}

.text-area {
    white-space: pre;
    text-align: start;
    min-height: 8rem;
}


table,
th,
td {
    border: 1px solid #EBEEF5;
}

td {
    padding: 15px;
    /* min-width: 100px; */
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
</style>
