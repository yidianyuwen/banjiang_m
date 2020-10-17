/**
 * Author: Nicky
 * Data: 2020-04-07
 * Last Modify:
 */

import axios from "axios"
import { Message, MessageBox } from 'element-ui'
import '@/assets/css/main.css'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {

    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['version'] = '1.0';
    config.headers['timestamp'] = new Date().getTime().toString();

    config.data = {dataStr: config.data};   // 明文输出报文
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)


// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    // alert(JSON.stringify(response.data))
    const decodeData = response.data;

    if (response.status !== 200) {
      Message({
        iconClass: 'none',
        message: decodeData.result.common.retMsg || 'Error',
        type: 'error',
        center: true,
        duration: 3 * 1000
      })
      return Promise.reject(new Error(decodeData.result.common.retMsg || 'Error'))
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (decodeData.result.common.retCode !== '000000') {
        Message({
          center: true,
          iconClass: 'none',
          type: 'error',
          message: decodeData.result.common.retMsg || 'Error',
          duration: 3 * 1000
        })
        return Promise.reject(new Error(decodeData.result.common.retMsg || 'Error'))
      } else {
        return decodeData
      }
    }
  },
  (error) => {
    // alert(JSON.stringify(error))
    // showToast(error.message);
    Message({
      center: true,
      iconClass: 'none',
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service