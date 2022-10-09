<template>
    <div>
        <Top :currentRoleId="current_role_id" @releaseNews="setNews" />
        <Tip />
        <div class="set_news_box" id="set_news_box">
            <ReleaseNews :showDialog="showSetNews" @off="offSetNews" @releaseNews="release" />
        </div>
        <div style="margin-top:0px">
            <NewsTable :tableData="newsInfoList" :currentRoleId="current_role_id" @checkNews="checkDetailNews"
                @modifyNews="modifyNewsContent" @cancelNews="cancelNewsDisplay" @auditNews="auditNews" />
        </div>
        <newsDetail :showDialog="showDetailNews" :newsInfo="theOne" @off="offCheckNews" />
        <modifyNews :dialog="isShowModify" :content="mopdifyNewsInfo" @off="offModifyNews" @modify="updateNews" />
        <bottom class="pager" :pageTotal="total" :page="getNewsData.page" @getNewPage="getNewPage"
            @pageSizeUpdate="pageSizeUpdate" />
    </div>
</template>
<script setup>
import { reactive, ref, provide } from 'vue'
import { GetTable, SetNews, ModifyNews, RepoulseNews, AuditNews } from '@/api/news'
import { GetUserinfo } from '@/api/login'
import Top from './Components/Top.vue'
import Tip from './Components/Tip.vue'
import NewsTable from './Components/NewsTable.vue'
import newsDetail from './Components/newsDetail.vue'
import ReleaseNews from './Components/ReleaseNews.vue'
import bottom from '@/views/A-My-Views/users/bottom.vue'
import modifyNews from './Components/modifyNews.vue'
import { ElMessage } from 'element-plus'
//获取当前登录用户的id
const current_role_id = ref()
const getUserInfo = async () => {
    const { data } = await GetUserinfo()
    current_role_id.value = data.roles.id
}
getUserInfo()
//获取新闻
const newsInfoList = ref([])
const getNewsData = reactive({
    page: 1,
    pageSize: 10,
    content: ''
})
const getAllTable = (data) => {
    GetTable(data).then(res => {
        total.value = res.total
        newsInfoList.value = res.list
        console.log(newsInfoList.value);
    })
}
getAllTable(getNewsData)
//新建新闻
const showSetNews = ref(false)
const setNews = () => {
    showSetNews.value = true
}
const release = (title, content) => {
    SetNews({
        title,
        content
    }).then(res => {
        if (res.code === 0) {
            ElMessage({
                type: 'success',
                message: '发布成功！',
                offset: 250,
                duration: 1000,
            })
        } else {
            ElMessage({
                type: 'error',
                message: '发布失败，请重新发布！',
                offset: 250,
                duration: 2000,
            })
        }
    })
}
const offSetNews = () => {
    showSetNews.value = false
    getAllTable(getNewsData)
}
//查看新闻
const theOne = ref()
const showDetailNews = ref(false)
const checkDetailNews = (id) => {
    theOne.value = newsInfoList.value.find(item => item.id == id)
    showDetailNews.value = true
    console.log(theOne.value);
}
const offCheckNews = () => {
    showDetailNews.value = false
}
//修改新闻
const isShowModify = ref(false)
const modifyId = ref()
const mopdifyNewsInfo = ref()
provide('dialog', 'isShowModify')
const modifyNewsContent = (id) => {
    modifyId.value = id
    mopdifyNewsInfo.value = newsInfoList.value.find(item => item.id === id)
    isShowModify.value = true
}
function updateNews(title, content) {
    ModifyNews({
        id: modifyId.value,
        title: title,
        content: content
    })
    getAllTable(getNewsData)
}
const offModifyNews = () => {
    isShowModify.value = false
    getAllTable(getNewsData)
}
//打回
const cancelNewsId = ref()
const cancelNewsDisplay = (id) => {
    cancelNewsId.value = id
    RepoulseNews({ id: cancelNewsId.value })
    // getAllTable(getNewsData)
}
//问题：打回、审核
//审核
const auditNews = (id, res, refusal) => {
    AuditNews({
        isApprove: res,
        reasonsForRefusal: refusal
    }, id)
    // getAllTable(getNewsData)
}

//页码显示
const total = ref()
const getNewPage = (page) => {
    getNewsData.page = page
    getAllTable(getNewsData)
}
const pageSizeUpdate = (pageSize) => {
    getNewsData.pageSize = pageSize
    getAllTable(getNewsData)
}
</script>

<style scoped>
.set_news_box {
    margin-top: 0px;
    width: 100%;
    min-width: 1000px;
}

.pager {
    z-index: 999;
}
</style>