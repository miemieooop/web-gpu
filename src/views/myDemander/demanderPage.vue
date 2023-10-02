<template>
  <div class="bg-gray-200 w-1/1 h-1/1"></div>
</template>
<script lang="ts" setup>
// fetch('http://134.84.200.6:8087/RPAService/modules/message/addMessage', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ message: '的就撒娇的撒的' })
// })
// console.log(res)
const st = '多少啦大撒大撒'
const reg = RegExp(/删除工号/)
console.log(reg.test(st))
</script>
