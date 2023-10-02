<template>
  <div class="w-screen h-screen flex flex-col">
    <navbarPage></navbarPage>
    <div class="flex flex-1">
      <sidebarPage></sidebarPage>
      <contentPage></contentPage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import navbarPage from './components/navbarPage.vue'
import sidebarPage from './components/sidebarPage.vue'
import contentPage from './components/contentPage.vue'
</script>
