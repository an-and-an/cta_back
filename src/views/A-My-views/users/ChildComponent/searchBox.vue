<script setup>
import { ref, watch } from "vue";
import { debounce } from "@/utils";
const emit = defineEmits(["search"]);
const inputValue = ref();

watch(inputValue, debounce(() => {
  emit("search", inputValue.value);
}, 500));
</script>

<template>
  <div class="search_user_by_studentid_box">
    <el-input
      v-model="inputValue"
      :clearable="true"
      resize="both"
      placeholder="请输入用户名或学号"
      suffix-icon="Search"
    />
  </div>
</template>
<style scoped>
.search_user_by_studentid_box {
  width: 50%;
  min-width: 300px;
  margin: 10px 0;
}
</style>
