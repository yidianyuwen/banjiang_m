/**
 * Author: Nicky
 * Data: 2020-10-17
 * Last Modify:
 */

var reg = new RegExp("年","g");

/**
 * 当前时间
 * @param param
 */
export const getNowFormatDate = (param: any) => {
  var date = new Date();
  var seperator1 = param;
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
  // var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
  return year + seperator1 + month + seperator1 + strDate + hours + minutes + seconds;
};

/**
 * 随机生成八位数
 */
export const random = () => {
  let randomNum;
  do
    randomNum = Math.floor(Math.random()*100000000);
  while( randomNum < 10000000 )
  return randomNum;
};

/**
 * 盘点数量
 * @param param
 */
export const countNum = (param: any) => {
  let unitNum = 0;

  let num1 = ((parseInt(param.num1First || 0)) * param.unit1Coefficient + parseInt(param.num1Two || 0) * param.unit1Coefficient) ;
  let num2 = (parseInt(param.num2First || 0) * param.unit2Coefficient + parseInt(param.num2Two || 0) * param.unit2Coefficient) ;
  let num3 = (parseInt(param.num3First || 0) * param.unit3Coefficient + parseInt(param.num3Two || 0) * param.unit3Coefficient) ;

  return unitNum = num1 + num2 + num3;
};

/**
 * 盘点金额
 * @param param
 */
export const countMony = (param: any) => {
  let unitMony = 0;

  let num1First = (parseFloat(param.num1First || 0) * parseFloat(param.unit1Coefficient)) * parseFloat(param.minOperateUnitPrice);
  let num1Two = (parseFloat(param.num1Two || 0) * parseFloat(param.unit1Coefficient)) * parseFloat(param.minOperateUnitPrice);
  let num2First = (parseFloat(param.num2First || 0) * parseFloat(param.unit2Coefficient)) * parseFloat(param.minOperateUnitPrice);
  let num2Two = (parseFloat(param.num2Two || 0) * parseFloat(param.unit2Coefficient)) * parseFloat(param.minOperateUnitPrice);
  let num3First = (parseFloat(param.num3First || 0) * parseFloat(param.unit3Coefficient || 0)) * parseFloat(param.minOperateUnitPrice);
  let num3Two = (parseFloat(param.num3Two || 0) * parseFloat(param.unit3Coefficient || 0)) * parseFloat(param.minOperateUnitPrice);

  return unitMony = num1First + num1Two + num2First + num2Two + num3First + num3Two;
};

/**
 * 年月日时间格式化
 * @param param
 */
export const formateData = (param: any) => {
  return param.replace(/年/g,'').replace(/月/, '').replace(/日/, '');
};
