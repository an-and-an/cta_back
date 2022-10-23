<script setup>
import { ref } from 'vue'
const props = defineProps(['currentRoleId'])
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
            <el-button v-if="props.currentRoleId==29" type="primary" @click="release" style="margin-right:20px;">
                新建
            </el-button>
            <el-input v-model="searchValue" @input="searchNews" placeholder="搜索" suffix-icon="Search"
                style="width:35%;min-width:200px;" />
        </div>
    </div>
</template>
<style>

</style>