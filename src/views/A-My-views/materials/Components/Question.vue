<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps(['questionNo', 'questionType', 'question', 'optionA', 'optionB', 'optionC', 'optionD', 'ans'])

const mapType = (type) => {
  if (type == 1) return '单选题'
  if (type == 2) return '多选题'
  if (type == 3) return '判断题'
}
const isAns = ref([false, false, false, false])
const init = () => {
  let ans = props.ans
  let idx = 0
  while (ans) {
    if (ans & 1) {
      isAns.value[3 - idx] = true;
    }
    ans >>= 1;
    idx++;
  }
}
onMounted(init)
</script>
<template>
  <div>
    <div>
      <h6>{{ `${questionNo}.(${mapType(questionType)})${question}` }}</h6>
      <div v-if="questionType == 1 || questionType == 2">
        <ol>
          <li>
            {{ optionA }}<el-icon v-if="isAns[0]">
              <Check />
            </el-icon>
          </li>
          <li>
            {{ optionB }}<el-icon v-if="isAns[1]">
              <Check />
            </el-icon>
          </li>
          <li>
            {{ optionC }}<el-icon v-if="isAns[2]">
              <Check />
            </el-icon>
          </li>
          <li>
            {{ optionD }}<el-icon v-if="isAns[3]">
              <Check />
            </el-icon>
          </li>
        </ol>
      </div>
      <div v-else>
        <div>{{ isAns }}</div>
        <ol>
          <li>
            {{ optionA }}<el-icon v-if="isAns[0]">
              <Check />
            </el-icon>
          </li>
          <li>
            {{ optionB }}
            <el-icon v-if="isAns[1]">
              <Check />
            </el-icon>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<style scoped>
li {
  list-style: upper-alpha;
}
</style>