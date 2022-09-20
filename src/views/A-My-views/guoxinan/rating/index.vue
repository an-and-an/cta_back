<script setup>
import StaticRating from './Component/staticRating.vue';
import DynamicRating from './Component/dynamicRating.vue';
</script>
<template>
  <div>
    <h1>评分列表</h1>
    <div>
      <h2>静态组</h2>
      <StaticRating></StaticRating>
    </div>
    <div>
      <h2>动态组</h2>
      <DynamicRating></DynamicRating>
    </div>
  </div>
</template>