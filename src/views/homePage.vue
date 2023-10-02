<template>
  <div ref="sceneRef" style="width: 100vw; height: 100vh"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { World } from '~/utils/World'
const sceneRef = ref<HTMLElement>()

onMounted(async () => {
  const world = new World(sceneRef.value!)
  await world.loadOutsideModel()
  world.render()
})
</script>
