<template>
  <div class="bottom_pagination" id="bottom_pagination">
    <el-pagination background :total="props.pageTotal" :page-sizes="[]"
      layout="prev, pager, next, jumper, ->, slot,,total" @current-change="getNewPage" :page-size="pageSize">
      <div style="width:100px;height:30px;display: flex;margin:10px;">
        <el-input v-model.number="inputVal" @input="pageSizeUpdate" size="small" :minlength="1" type="number" />
        <span>条/页</span>
      </div>
    </el-pagination>
  </div>
</template>
<script setup>
import { onMounted, ref, watch,nextTick} from 'vue'
import { debounce } from '@/utils/index'

const props = defineProps(['pageTotal', 'page','pageSize'])
const emit = defineEmits(['pageSizeUpdate', 'getNewPage'])

const inputVal = ref()
watch(props.pageSize,(newValue, oldValue)=> { 
  inputVal.value = newValue
})


const getNewPage = (newPage) => {
  emit('getNewPage', newPage)
}

const pageSizeUpdate = debounce(function () {
  if (!inputVal.value) return;
  emit('pageSizeUpdate', inputVal.value)
}, 300)

</script>
<style scoped>
#bottom_pagination {
  position: sticky;
  bottom: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>