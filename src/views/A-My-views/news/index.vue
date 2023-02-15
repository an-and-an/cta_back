<template>
    <div>
        <Top 
            :currentRoleId="current_role_id" 
            @releaseNews="setNews"
            @search="searchNews" 
        />
        <Tip />
        <div class="set_news_box" id="set_news_box">
            <ReleaseNews 
                :showDialog="showSetNews" 
                @off="offSetNews" 
                @releaseNews="release" 
            />
        </div>
        <div>
            <NewsTable 
                :tableData="newsInfoList" 
                :currentUserId="current_user_id"
                :currentRoleId="current_role_id" 
                @checkNews="checkDetailNews"
                @modifyNews="modifyNewsContent" 
                @cancelNews="cancelNewsDisplay" 
                @auditNews="auditNews" 
            />
        </div>
        <newsDetail 
            :showDialog="showDetailNews" 
            :newsInfo="theOne" 
            @off="offCheckNews" 
        />
        <modifyNews 
            :dialog="isShowModify" 
            :content="mopdifyNewsInfo" 
            @off="offModifyNews" 
            @modify="updateNews" 
        />
        <bottom  
            :pageTotal="total" 
            :page="getNewsData.page" 
            @getNewPage="getNewPage"
            @pageSizeUpdate="pageSizeUpdate" 
            class="pager"
        />
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { GetTable, SetNews, ModifyNews, RepoulseNews, AuditNews } from '@/api/news'
import { GetUserinfo } from '@/api/login'
import { ElMessage } from 'element-plus'
import { apiOver } from '@/utils/api'
import Top from './Components/Top.vue'
import Tip from './Components/Tip.vue'
import NewsTable from './Components/NewsTable.vue'
import newsDetail from './Components/newsDetail.vue'
import ReleaseNews from './Components/ReleaseNews.vue'
import bottom from '@/views/A-My-Views/users/bottom.vue'
import modifyNews from './Components/modifyNews.vue'

//获取当前登录用户的id
const current_role_id = ref()
const current_user_id=ref()
const getUserInfo = async () => {
    const { data } = await GetUserinfo()
    console.log('888data---', data.id);

    current_user_id.value=data.id
    current_role_id.value = data.roles.id
}
getUserInfo()

//获取新闻
const newsInfoList = ref([])
const getNewsData = reactive(
    {
        page: 1,
        pageSize: 10,
        content: ''
    }
)
const getAllTable = () => {
    GetTable(getNewsData).then(res => {
        total.value = res.total
        newsInfoList.value = res.list
        if (res.list.length == 0) {
            ElMessage({
                message: '没有查询到相关新闻！',
                type: 'warning',
                offset: 250,
                duration: 1000
            })
        }
    })
}
getAllTable()

//新建新闻
const showSetNews = ref(false)
const setNews = () => {
    showSetNews.value = true
}
const release = (title, content) => {
    SetNews(
        {
        title,
        content
        }
    ).then(res => {
        if (res.code === 0) {
            ElMessage({
                type: 'success',
                message: '发布成功！',
                offset: 250,
                duration: 1000,
            })
            getAllTable()
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
    getAllTable()
}

//查看新闻
const theOne = ref()
const showDetailNews = ref(false)
const checkDetailNews = (id) => {
    theOne.value = newsInfoList.value.find(item => item.id == id)
    showDetailNews.value = true
}
const offCheckNews = () => {
    showDetailNews.value = false
}

//搜索新闻
const searchNews = (val) => {
    getNewsData.content = val
    getAllTable()
}

//修改新闻
const isShowModify = ref(false)
const modifyId = ref()
const mopdifyNewsInfo = ref()
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
    }).then(res => {
        apiOver(() => {
            getAllTable()
            isShowModify.value = false
        }, res.code, res.message, {
            duration: 1000,
            offset: 250,
        })
    })
}
function offModifyNews (){
    isShowModify.value = false
    getAllTable()
}

//打回
const cancelNewsId = ref()
function cancelNewsDisplay(id){
    cancelNewsId.value = id
    RepoulseNews({ id: cancelNewsId.value }).then(res => {
        apiOver(() => {getAllTable()}, res.code, res.message, {
            duration: 1000,
            offset: 250,
        })
    })
}

//审核
function auditNews(id, res, refusal){
    AuditNews(
        {
        isApprove: res,
        reasonsForRefusal: refusal
        }
        , id).then(res => {
            apiOver(() => {getAllTable()}, res.code, res.message, {
            duration: 1000,
            offset: 250,
        })
    })
}

//页码显示
const total = ref()
const getNewPage = (page) => {
    getNewsData.page = page
    getAllTable()
}

const pageSizeUpdate = (pageSize) => {
    getNewsData.pageSize = pageSize
    getAllTable()
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