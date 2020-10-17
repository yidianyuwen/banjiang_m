/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

import request from '@/utils/request'
import TYPES from './types'

/**
 * 商品信息
 * @param params
 */
export const getProductData = (params: TYPES.product_data) =>
  request.post('', params);
