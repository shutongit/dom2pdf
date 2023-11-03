import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'


// A4纸的宽高
const A4 = { w: 595, h: 841.89 }

// 渲染的缩放比例
const domScale = { h: 1 }

// 最大渲染
const maxHeight = 30000

// 默认配置
const CONFIG = {
  maxHeight: 30000, // 最大渲染的高度
  title: String(Date.now()), // 下载标题
  fileW: A4.w,  // 画布中内容的宽度
  fileH: A4.h,  // 画布中内容的高度
}


class Dom2pdf {

  /**
   * dom转pdf
   * @param {HTMLElement} dom 要渲染的dom元素
   * @param {Object} config 自定义配置
   * @param {Function} callback 回调方法
   */
  constructor(dom, config, callback) {
    if (dom && dom instanceof HTMLElement) {

      this.configKey(CONFIG)

      if (config) {
        this.configKey(config)
      }
      this.dom = dom
      this.callback = callback

      this.configCanvas(this.fileH)
    } else {
      throw Error('请选择要导出的dom元素!')
    }

  }

  configKey (config) {
    for (const key in config) {
      if (Object.hasOwnProperty.call(config, key)) {
        const item = config[key]
        this[key] = item
      }
    }
  }


  /**
   * 创建并配置canvas的参数
   */
  configCanvas = function (h) {
    // 画板dom
    const canvasDom = document.createElement('canvas')
    canvasDom.style.backgroundColor = '#fff'
    canvasDom.style.width = this.fileW + 'px'
    canvasDom.style.height = h + 'px'

    // 默认的高度缩放比例

    canvasDom.width = this.fileW
    if (maxHeight > h) {
      canvasDom.height = h
    } else {
      // 根据实际高度和最大渲染高度来计算缩放
      domScale.h = maxHeight / h
      canvasDom.height = domScale.h * h
    }
    // 画板
    const ctx = canvasDom.getContext('2d')
    ctx.scale(1, domScale.h)
    this.domRenderToCanvas(canvasDom)
  }

  /**
   * dom 元素在canvas上渲染
   */
  domRenderToCanvas = function (c) {
    html2canvas(this.dom, {
      backgroundColor: '#fff',
      canvas: c,
      useCORS: true,
    }).then((canvas) => {
      // 获取canvas转url的数据
      let data = canvas.toDataURL()
      this.canvasToPdf(canvas, data)
    })
  }

  /**
   * image转pdf
   * @param {Canvas} c 画板
   * @param {String} data image-data
   */
  canvasToPdf = function (c, data) {


    // 获取画板的实际宽度
    let contentWidth = c.width

    // 获取画板的实际高度
    let contentHeight = c.height / domScale.h

    // 获取在A4纸上每一页应该渲染的高度
    let pageHeight = A4.h

    // 剩余要渲染的高度
    let leftHeight = contentHeight

    // 上下留白
    const gap = 20

    // 这里记录剩余多少高度需要渲染成A4纸高度 a4H
    let position = gap

    // 图片的宽度
    let imgWidth = this.fileW

    // 图片的高度实际高度；根据canvas的缩放来计算
    let imgHeight = contentHeight

    // 转为pdf
    var pdf = new jsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      pdf.addImage(
        data,
        'PNG',
        (A4.w - imgWidth) / 2, // 居中对齐
        gap,
        imgWidth,
        imgHeight - gap * 2
      )
    } else {
      while (leftHeight > 0) {
        pdf.addImage(
          data,
          'PNG',
          (A4.w - imgWidth) / 2,
          position,
          imgWidth,
          imgHeight - gap * 2
        )
        leftHeight -= pageHeight
        position -= A4.h
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.save(this.title)
    this.callback && this.callback({ code: 200, msg: '下载成功' })
  }
}



export default Dom2pdf