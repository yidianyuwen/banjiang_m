/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

/**
 * 当前时间
 * @param param
 */
export const getNowFormatDate = (param: any) => {
  var date = new Date();
  var seperator1 = '-';
  var year = date.getFullYear();
  var month: any = date.getMonth() + 1;
  var strDate: any = date.getDate();
  var hours = date.getHours();       //获取当前小时数(0-23)
  var minutes = date.getMinutes();     //获取当前分钟数(0-59)
  var seconds = date.getSeconds();     //获取当前秒数(0-59)
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  // var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
  return currentdate;
}