/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

import request from '@/utils/request'
import TYPES from './types'

/**
 * 差异率计算
 * @param params
 */
export const getDifferent = (params: TYPES.different) =>
  request.post('/banjiang/inventory/calculateSpRate', params);
