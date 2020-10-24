/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

import request from '@/utils/request'
import TYPES from './types'

/**
 * 查询盘点原料列表
 * @param params
 */
export const getProductData = (params: TYPES.product_data) =>
  request.post('/banjiang/inventory/queryInventorySp', params);

/**
 * 盘点数据录入
 * @param params
 */
export const inventoryRecord = (params: TYPES.inventory_record) =>
  request.post('/banjiang/inventory/inventoryRecord', params);
