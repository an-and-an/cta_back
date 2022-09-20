<script setup>
import { ref } from 'vue';
import { GetAllDepartment } from '@/api/recruitment'
import top from '@/views/A-My-views/recruitment/alldepartment/top.vue'
import departments from '@/views/A-My-views/recruitment/alldepartment/departments.vue'
</script >
<template>
  <div>
    <!-- 顶部 -->
    <div>
      <top></top>
    </div>
    <!-- ... -->
    <div>
      <departments></departments>
    </div>
  </div>
</template>
<style>

</style>