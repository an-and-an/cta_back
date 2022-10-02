<script setup>
import { ref } from 'vue'
const emit = defineEmits(['releaseNews'])
//发布
const release = () => {
    console.log("点击发布新闻");
    emit('releaseNews')
}
//搜索
const searchValue = ref()
const searchNews = () => {

}
</script>
<template>
    <div style="width:100%;min-width:1000px">
        <div>
            <el-button-group>
                <el-button type="primary">
                    新闻
                </el-button>
                <el-button type="primary" @click="release">
                    新建
                </el-button>
            </el-button-group>
            <el-input v-model="searchValue" @change="searchNews" placeholder="搜索"
                style="width:35%;min-width:200px; margin-left:50px;margin-right: 200px;" />
        </div>
    </div>
</template>
<style>

</style>