/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

import request from '@/utils/request'
import TYPES from './types'

/**
 * 登录
 * @param params
 */
export const login = (params: TYPES.login) =>
  request.post('', params);
