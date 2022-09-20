<script setup>
import { GetTable } from '@/api/news'
import { SetNews } from '@/api/news'
import { ref } from 'vue'
import Top from '@/views/A-My-views/news/Components/Top.vue'
import SetNewsDialog from '@/views/A-My-views/news/Components/SetNewsDialog.vue'
// import Editor from './Components/Editor.vue'
const newsInfoList = ref([
    {
        newsTitle: "四川轻化工大学一学生一夜之间长高20cm",
        newsReleasePerson: "张三",
        newsReleaseTime: "2022-2-29",
    }
])
GetTable({
    page: "1",
    pageSize: "10",
}).then(res => {
    // console.log("res.list", res.list);
})
//添加新闻
const showAddNews = ref(false)
const setNews = () => {
    SetNews({
        title: "关于禁止在校园遛、养猫犬和其他宠物的通告",
        content: "根据《中华人民共和国治安管理处罚法》第75条，《动物防疫法》(2021 年)第30条、第92条和《民法典》第1245、1246、1247、1249、1250条之规定，从即日做以下规定一、禁止任何人将犬只、猫和其他宠物带入校园。二、禁止任何人在学校教学楼、公寓、实验室等场地饲养犬只、猫和其他宠物。三、禁止任何人在校园内遛和抛弃犬只、猫和其他宠物。四、禁止任何人在校园对流浪犬、猫进行抛食、喂养等行为。学校将加大校园巡检力度，对发现以上行为进行劝阻、批评，对携带猫狗进宿舍、教室、办公区、实验室和其他公共区域等行为严肃处理。学校将结合新修订的《动物防疫法》相关规定对流浪犬、猫进行控制和处置；会同属地行政执法大队对流浪犬、猫进行捕捉；对不听劝阻、性质恶劣的行为进行曝光和严肃处理。校区举报电话：0813-5506119（汇东校区）；0813-5502110(李白河校区）；0831 - 5959110（宜宾校区）。"
    }).then(res => {
        console.log("the res is : ", res);
    })
}
setNews()
</script>
<template>
    <div>
        <Top @showAddNews="showAddNews=true" />
        <SetNewsDialog />
    </div>
    <div>
        <!-- <Editor v-if="childDom" ref="editorRef" :getContent="默认值" /> -->
    </div>
</template>
<style>

</style>