import { createApp } from 'vue'
import Loading from './index.vue'
const relative = 'relative'
const loadingDirective = {
  /* 节点都挂载完成后调用 */
  mounted (el, binding) {
    /* 
       value 控制开启和关闭loding
       arg loading显示的文字
    */
    const { value, arg } = binding
    console.log(value, arg)

    /* 创建loading实例,并挂载 */
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    /* 为了让elAppend获取到创建的div元素 */
    el.instance = instance

    /* 添加title */
    if (arg) {
      instance.setTitle(arg)
    }
    /* 将loading实例挂载到指令元素中 */
    // if (value) {
    handleAppend(el)
    // }
  },
  /* 更新后调用 */
  updated (el, binding) {
    const { value, oldValue, arg } = binding
    if (value !== oldValue) {
      /* 更新标题 */
      if (arg) {
        el.instance.setTitle(arg)
      }
      value ? handleAppend(el) : handleRemove(el)
    }
  }
}
/* 将loading添加到指令所在DOM */
const handleAppend = (el) => {
  const style = getComputedStyle(el)
  //   console.log(style.position)
  if (!['absolute', 'relative', 'fixed'].includes(style.position)) {
    addClass(el, relative)
  }

  el.appendChild(el.instance.$el)
}

/* 将loading在DOM中移除 */
const handleRemove = (el) => {
  removeClass(el, relative)
  el.removeChild(el.instance.$el)
}

const addClass = (el, className) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}
const removeClass = (el, className) => {
  el.classList.remove(className)
}

// export default loadingDirective

// import type { App } from 'vue'
// import loading from '@/components/Loading/index'
export default {
  install: (app) => {
    app.directive('loading', loadingDirective)
  }
}