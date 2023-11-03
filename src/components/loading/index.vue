<script setup>
import { ref } from 'vue'
// defineProps({
//   title: {
//     type: String,
//     default: '加载中...',
//   },
// })

const title = ref('')
const setTitle = (newTitle) => {
  title.value = newTitle
}
defineExpose({
  setTitle,
  title,
})
</script>
<template>
  <div class="loading-box">
    <div class="loading-content">
      <i class="icon-loading"></i>
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.loading-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    img {
      width: 35px !important;
      height: 35px !important;
    }
    .desc {
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      position: relative;
    }
  }
}

.icon-loading {
  animation: circle infinite 0.75s linear;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
