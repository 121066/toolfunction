/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', function () {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function () {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function () {
    listen()
  })
  document.addEventListener('msfullscreenchange', function () {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return (
    document.isFullScreen ||
    document.mozIsFullScreen ||
    document.webkitIsFullScreen
  )
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

// 页面滑动到底部
export const getScrollBottom = (callback) => {
  window.onscroll = () => {
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight
    if (scrollTop + windowHeight == scrollHeight) {
      return callback
    }
  }
}
// 对象深拷贝
export const deepClone = (data) => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
export const getObjType = (obj) => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
// 根据值找index
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}

// 去除空格
export const trim = (val) => {
  return val.replace(/(^\s*)|(\s*$)/g, '')
}
// 判断是否为空
export function isEmpty(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (
      val == 'null' ||
      val == null ||
      val == 'undefined' ||
      val == undefined ||
      val == ''
    )
      return true
    return false
  }
  return false
}

//解析url
export const getSearch = (params) => {
  const searchPar = new URLSearchParams(
    params.split('?')[1] || window.location.search
  )
  const paramsObj = {}
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value
  }
  return paramsObj
}
//去除数组中的无用值

// 去除数组中的无用值
export const compact = (arr) => arr.filter(Boolean)
//交换
export const tempArray = function (arr, j, i) {
  let temp = arr[j]
  arr[j] = arr[i]
  arr[i] = temp
}
// 排序
export function tempSort(arrs) {
  for (let i = 0; i < arrs.length; i++) {
    for (let j = 0; j < arrs.length; j++) {
      if (arr[i] < arr[j]) {
        tempArray(arrs, i, j)
      }
    }
  }
}
//千分位

export let numStr = (params) => {
  let num = String(params).split('')
  let index = num.length - 3
  num.forEach((item) => {
    if (index > 0) {
      num.splice(index, 0, ',')
      index -= 3
    }
  })
  return num.join('')
}
//  滚动到指定区域

export const smoothScroll = (element) =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth',
  })

//防抖
export function _debounce(fn, delay) {
  var delay = delay || 200
  var timer
  return function () {
    var th = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay)
  }
}
//节流
export function _throttle(fn, interval) {
  var last
  var timer
  var interval = interval || 200
  return function () {
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}
export function getItem(key) {
  const val = localStorage.getItem(key)
  try {
    return JSON.parse(val)
  } catch (_) {
    return val
  }
}

export function setItem(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function removeItem(key) {
  localStorage.removeItem(key)
}

export function removeAll() {
  localStorage.removeAll()
}
//校验手机
export const isPhone = (inputString) => {
  var partten = /^1([358][0-9]|4[579]|66|7[01235678]|9[189])[0-9]{8}$/
  if (partten.test(inputString)) {
    return true
  } else {
    return false
  }
}
//校验银行卡
export const isBankCard = (bankNo) => {
  var num = /^\d*$/
  if (bankNo.length < 16 || bankNo.length > 19 || !num.test(bankNo)) {
    return false
  }
  return true
}

//校验身份证
export const ispCardNo = (cardNo) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(cardNo) === false) {
    return false
  }
  return true
}
