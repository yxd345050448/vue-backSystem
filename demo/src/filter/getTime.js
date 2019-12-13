//时间过滤器
function getTime(ogj) {
    var obj = parseInt(obj);
    var d = new Date;
    var year =d.getFullYear();
    var month =(d.getMonth()+1+"").padStart(2,'0');
    var day = (d.getDate()+"").padStart(2,'0');
    return `${year}年${month}月${month}日`
}
export default getTime;
