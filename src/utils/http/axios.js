import instance from "./index"

/**
 * 创建请求
 * @param {Object} param0 请求的类型、url、参数、配置
 */
const axios = ({ method, url, data, config }) => {
  method = method?.toLowerCase()
  if (method == 'post') {
    return instance.post(url, data, { ...config })
  } else if (method == 'get') {
    return instance.get(url, {
      params: data,
      ...config
    })
  } else {
    console.error(`未知的请求method: ${method}, url: ${url}`)
  }
}

export default axios