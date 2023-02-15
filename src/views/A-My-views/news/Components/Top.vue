<template>
    <div style="width:100%;min-width:1000px">
        <div>
            <el-button v-my-roles="ROLES_KEY.CREATE" type="primary" @click="release" style="margin-right:20px;">新建
            </el-button>
            <el-input v-model="searchValue" @input="searchNews" placeholder="搜索" suffix-icon="Search"
                style="width:35%;min-width:200px;" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from '@/utils';
import { ROLES_KEY, isShowComponent } from '@/directive/roles';
const props = defineProps(['currentRoleId'])
const emit = defineEmits(['releaseNews', 'search'])

const release = () => {    //发布
    emit('releaseNews')
}
const create = isShowComponent(ROLES_KEY.CREATE);
const searchValue = ref()
const searchNews = debounce((val) => {  //搜索
    emit('search', val)
}, 500)
</script>

