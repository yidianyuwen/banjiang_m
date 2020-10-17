/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

import request from '@/utils/request'
import TYPES from './types'

/**
 * 历史记录
 * @param params
 */
export const getHistoryRecord = (params: TYPES.history_record) =>
  request.post('', params);
