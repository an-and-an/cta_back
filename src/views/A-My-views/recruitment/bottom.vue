<template>
  <div class="bottom_pagination" id="bottom_pagination">
    
    <el-pagination background :total="props.pageTotal" :page-sizes="[]"
      layout="prev, pager, next, jumper, ->, slot,total" @current-change="getNewPage" :page-size="pageSize">
      <div class="input_box" id="input_box">
        <input 
        v-model="inputVal" 
        @input="pageSizeUpdate"  
        :minlength="1" 
        type="number"
        style="width:60px;border: 0.2px solid darkgray;"
        />
        <span> 
          &nbsp; &nbsp; &nbsp;条/页
        </span>
      </div>
    </el-pagination>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { debounce } from '@/utils/index'

const props = defineProps(['pageTotal', 'page','pageSize'])
const emit = defineEmits(['pageSizeUpdate', 'getNewPage'])

const inputVal = ref(props.pageSize)
watch(props, (newValue, oldValue) => { 
  inputVal.value = newValue.pageSize
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
#input_box{
  display: flex;
  margin:20px;
  width:100px;
  height:30px;
}
</style>