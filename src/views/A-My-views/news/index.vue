<template>
    <div>
        <Top @releaseNews="setNews" />
        <div class="set_news_box" id="set_news_box">
            <ReleaseNews :showDialog="showSetNews" @off="offSetNews" @releaseNews="release" />
        </div>
        <div style="margin-top:10px">
            <NewsTable :tableData="newsInfoList" @checkNews="checkDetailNews" @modifyNews="modifyNewsContent" />
        </div>
        <newsDetail :showDialog="showDetailNews" :newsInfo="theOne" @off="offCheckNews" />
        <modifyNews :dialog="isShowModify" :content="mopdifyNewsInfo" @off="offModifyNews" @modify="updateNews" />
        <bottom class="pager" :pageTotal="total" :page="getNewsData.page" @getNewPage="getNewPage"
            @pageSizeUpdate="pageSizeUpdate" />
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { GetTable, SetNews, ModifyNews } from '@/api/news'
import Top from './Components/Top.vue'
import NewsTable from './Components/NewsTable.vue'
import newsDetail from './Components/newsDetail.vue'
import ReleaseNews from './Components/ReleaseNews.vue'
import bottom from '@/views/A-My-Views/users/bottom.vue'
import modifyNews from './Components/modifyNews.vue'
import { ElMessage } from 'element-plus'
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
const modifyNewsContent = (id) => {
    console.log("thei id is--",id);
    modifyId.value = id
    mopdifyNewsInfo.value = newsInfoList.value.find(item => item.id === id)
    isShowModify.value = true
}
const updateNews = (title, content) => {
    ModifyNews({
        id: modifyId.value,
        title: title,
        content:content
    }).then(res => {
        if (res.code === 0) {
            isShowModify.value = false 
            ElMessage({
                type: 'success',
                message: '成功提交修改！',
                offset: 250,
                duration: 1000,
            }) 
        }else{
            ElMessage({
                type: 'success',
                message: '提交失败，请重新提交修改！',
                offset: 250,
                duration: 1000,
            }) 
        }

    })

}
const offModifyNews = () => {
    isShowModify.value = false
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
    margin-top: 50px;
    width: 100%;
    min-width: 1000px;
}

.pager {
    z-index: 999;
}
</style>