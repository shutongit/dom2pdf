# dom2file



> 使用的第三方插件有 `html2canvas`,`jspdf`



## 目标

- 旨在实现 dom 转 pdf 文件的功能；
- 以及解决 dom 元素过大导致文件转化失败的问题；



## 方案

1. 计算是否需要进行缩放

```js
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
```





2. 使用`html2canvas`进行把`dom`渲染在`canvas`上

```js
 html2canvas(this.dom, {
      backgroundColor: '#fff',
      canvas: c,
      useCORS: true,
    }).then((canvas) => {
    // TODO: todo ...
    })
```



3. 使用`canvas`把画布转为图片

```js
  // 获取canvas转url的数据
  let data = canvas.toDataURL()   
```



4. 使用`jspdf`把`canvas`

```js
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

        leftHeight > 0 && pdf.addPage()
      }
    }
    pdf.save(this.title)
```



# 项目运行

- 安装依赖

```sh
npm install	
```

- 本地运行

```sh
npm run dev
```

- 打包

```sh
npm run build
```
