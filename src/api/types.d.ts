/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

export interface login {
  custNo?: any,
  custPwd?: any,
}

export interface history_record {
  pageNo?: any,
  pageSize?: any,
  shopId?: any,
  shopName?: any,
}

export interface product_data {
  id?: any,
}

export interface inventory_record {
  checkFoodDate?: any,
  inventoryFoodsReqList?: any,
  inventoryTotalAmt?: any,
  shopId?: any,
  shopName?: any,
}

export interface different {
  startDate?: any,
  endDate?: any,
  shopId?: any,
  shopName?: any,
  spName?: any,
  spNo?: any,
}
