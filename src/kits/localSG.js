// 1.0 定义常量key,将来操作的localStorage中的数据都以这个key来作为标识
export const KEY = 'goodsdata';
export  var  valueObj = {goodsid:0,count:0};
//2.0 调用本地存储的setItem方法来获取数据
export function setItem(value){
// value;格式： {goodsid:87,count:10}
    //2.1 先获取到本地存储中的数据，然后转换成json格式
    var localData = localStorage.getItem(KEY);
    localData = localData || '[]';
    var arr = JSON.parse(localData);
    //2.2 转换成josn格式之后把传过来的value数据push到arr中，拼接起来
    arr.push(value);
    //2.3 把数据按字符串的形式保存到本地
    localStorage.setItem(KEY,JSON.stringify(arr));
}
//3.0 获取数据 getItem
export function getItem(){
    var localData = localStorage.getItem(KEY);
    localData = localData || '[]';
    return JSON.parse(localData);
}
//4.0 移除数据
export function removeItem(){

}