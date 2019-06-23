import axios from 'axios'

export const get = function(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, data)
    .then(response => {
      resolve(response.data)
    }, err => {
      // Message.error('请求错误：' + err.message)
      reject(err)
    })
  })
}

export const post = function(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
    .then(response => {
      resolve(response.data)
    }, err => {
      // Message.error('请求错误：' + err.message)
      reject(err)
    })
  })
}