/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

/**
 *
 * 元转万元
 * @param param
 */
export const formatTenThousand = (param: any) => {
  let turnResult = '';
  if (param) {
    turnResult = Number(param) /10000 + "万";
  } else {
    turnResult = '***';
  }
  // let turnResult = Math.round((Number(param) /10000) * 100) / 100 + "万";  // 保留两位小数 并 取整
  return turnResult;
};

/**
 *
 * 元转万元  保留两位小数
 * @param param
 */
export const formatTenThousandTwoDec = (param: any) => {
  return (Number(param) / 10000).toFixed(2) + "万";
};
