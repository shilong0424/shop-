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
//5.0 把数据导出到购物车详情页面
export function getshopData(){
    //5.1 先获取到本地存储的数据
    var arr = getItem();
    var shopData = {};
//  arr的格式：
// [{goodsid:87,count:1},{goodsid:87,count:3},{goodsid:88,count:1}]
    for(var i =0;i < arr.length;i++){
        var item = arr[i];
        if(!shopData[item.goodsid]){
            //item.goodsid 是键  item.count 是值
            shopData[item.goodsid]= item.count;//这里shopData写成了arr   大失误！
        }else {
            var count = shopData[item.count];
            shopData[item.goodsid] = count + item.count;
        }
    }
    return shopData; //{87:1,87:1,88:3}这种格式
}