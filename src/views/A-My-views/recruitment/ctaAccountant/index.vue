<script setup>
import { ref, watch } from 'vue';
import userInfoCard from './ChildComponent/userInfoCard.vue'
import currentAccountant from './ChildComponent/currentAccountant.vue'
import LastCadres from './ChildComponent/LastCadres.vue'
const activeTagPage = ref('current_all')
const currentCadres = ref(null)

watch(activeTagPage, (n, o) => n === 'current_cadre' && currentCadres.value.getCurrentCadres())
</script>  
<template>
    <div>
        <h2>计算机技术协会</h2>
        <div>
            <el-tabs v-model="activeTagPage" class="demo-tabs">
                <el-tab-pane label="干部干事概览" name="current_all">
                    <userInfoCard />
                </el-tab-pane>
                <el-tab-pane label="本届干部" name="current_cadre">
                    <currentAccountant ref="currentCadres" />
                </el-tab-pane>
                <el-tab-pane label="往届干部" name="former_cadre">
                    <last-cadres />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
</style>