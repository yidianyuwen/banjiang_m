/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

import request from '@/utils/request'
import TYPES from './types'

/**
 * 查询盘点记录列表
 * @param params
 */
export const getHistoryRecord = (params: TYPES.history_record) =>
  request.post('/banjiang/inventory/queryCheckData', params);
