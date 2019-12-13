//年龄
var age = function(obj){
    var re = /^[1-9][0-9]|100$/
    return re.test(obj)
}
//评分
var score = function(obj){
    var re = /^[0-5]$/
    return re.test(obj)
}
//点赞|销售量|浏览量
var zan = function(obj){
    var re = /^\d+(\.{0,1}\d+){0,1}$/
    return re.test(obj)
}
//距离
var len = function(obj){
    var re = /^\d+(km)|\d+\.\d(km)$/
    return re.test(obj)
}
//座机
var tel1 = function(obj){
    var re = /^\d{3}-\d{3}-\d{4}$/
    return re.test(obj)
}
//手机
var tel2 = function (obj) {
    var re = /^1[0123456789]\d{9}$/
    return re.test(obj)
}
//价格
var price1 = function (obj) {
    var re = /^(\d)+(元\/每桶)$/
    return re.test(obj)
}

var price2 = function (obj) {
    var re = /^(\d)+(元\/每小时)$/
    return re.test(obj)
}
//经验
var exp = function (obj) {
    var re = /^\d+年$/
    return re.test(obj)
}
//级别
var level = function(obj){
    var re = /^v[0-9]$/
    return re.test(obj)
}
export default {
    age,
    score,
    zan,
    len,
    tel1,
    tel2,
    price1,
    price2,
    exp,
    level
}

