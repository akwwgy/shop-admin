<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style >
body {
  @apply bg-gray-100;
}

#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 10px;
}
</style>