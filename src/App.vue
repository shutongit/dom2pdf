<script setup>
import { ref } from 'vue'
import axios from '@/utils/http/axios.js'

import Dom2pdf from '@/utils/dom2pdf/index.js'

// 数据源
const list = ref([])

const fileW = 320

// dom
const wrapperRef = ref()

/**
 * 点击下载
 */
function handleDown() {
  const height = wrapperRef.value.clientHeight

  new Dom2pdf(
    wrapperRef.value,

    { fileW: fileW, fileH: height },
    ({ code, msg }) => {
      console.log('code: ', code)
      console.log('msg: ', msg)
    }
  )
}

/**
 * 加载数据
 */
async function loadData() {
  const param = {
    page: 4,
    limit: 100,
  }
  try {
    const res = await axios({
      method: 'get',
      url: 'v2/list',
      data: param,
    })
    list.value = res || []
    list.value.push(...list.value)
    // list.value.push(...list.value)
  } catch (error) {
    console.log('error: ', error)
  }
}
loadData()
</script>
<template>
  <button
    class="down"
    @click="handleDown">
    下载
  </button>
  <div
    id="wrapper"
    ref="wrapperRef">
    <div
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      class="box">
      <img
        :src="item.download_url"
        alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
// @maxHeight: 30000px;
@fileW: 320px;
#wrapper {
  width: @fileW;
  // height: @maxHeight;
  height: 100%;
}
.box {
  width: 100%;
}
.box img {
  width: 100%;
  object-fit: contain;
}
.down {
  position: fixed;
}
</style>
