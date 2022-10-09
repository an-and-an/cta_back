<template>
  <div class="basic_box" id="basic_box">
   
    <div style="position:relative">
      <div style="position:absolute">
        <draggable v-model="fileList" v-bind="dragOptions" item-key="id" @start="start" @end="end" @change="change">
          <template #item="{element}">
            <div class="item_img_box">
              <img :src="element.url" alt="">
              <div @click="hidden(element)" class="hidden_picture_mask">隐藏</div>
            </div>
          </template>
        </draggable>
      </div>
      <div style="position:absolute;top:-80px;left:500px">
      <el-button v-if="isShowButton"  @click="submitUpdate"  type="success" plain
        size="small" >提交轮播图顺序</el-button>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
const props = defineProps(['fileList', 'picture'])
const emit = defineEmits(['update'])
const isDragging = ref(false)
const list = ref([])
const isShowButton = ref(false)
const dragOptions = ({
  animation: 1000,
  group: "picture",
  disabled: false,
  ghostClass: "ghost",
  chosenClass: "chosen",
  forceFallback: true,
})
function start() {
  isDragging.value = true
}
function end() {
  isDragging.value = false
}
//顺序发生变化
function change(a) {
  isShowButton.value = true
  move(a.moved.oldIndex, a.moved.newIndex)
}
//移动
const move = (old, now) => {
  if (old < now) {
    props.fileList.splice(now + 1, 0, props.fileList[old])
    props.fileList.splice(old, 1)
    list.value = props.fileList.map((factor, index) => {
      return {
        factor,
        order: (index + 1) * 2 - 1,
      }
    })
  } else {
    props.fileList.splice(now, 0, props.fileList[old])
    props.fileList.splice(old + 1, 1);
    console.log('props.fileList', props.fileList);
    list.value = props.fileList.map((factor, index) => {
      return {
        factor: factor,
        order: (index + 1) * 2 - 1,
      }
    })
  }
}
//确认移动
function submitUpdate() {
  console.log(list.value);
  list.value.forEach(
    element => {
      emit('update', element.factor)
    }
  )
}
//改为不显示
const hidden = (element) => {
  element.rank = -1;
  console.log('点击隐藏');
  emit('update', element)
}
</script>
<style scoped>
* {
  margin: 0 auto;
  padding: 0;
}

.basic_box {
  width: 100%;
  height: 100%;
}

.item_img_box {
  position: relative;
  float: left;
  width: 150px;
  aspect-ratio: 1/1;
}

.item_img_box img {
  width: 150px;
  aspect-ratio: 1/1;
  object-fit: contain;
}

.hidden_picture_mask {
  position: absolute;
  top: 0;
  width: 35px;
  aspect-ratio: 1/1;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 300;
}

.hidden_picture_mask:hover {
  cursor: pointer;
}
</style>