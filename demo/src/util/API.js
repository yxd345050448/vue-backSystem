var api = ''
//登录
var login = api + '/login'
//查询管理员
var ssManage = api + '/findManage'
//删除管理员
var delManage = api + '/delManage'
//添加管理员
var addManage = api + '/addManage'
//更新管理员
var updateManage = api + '/updateManage'
//获取轮播图
var banner = api + '/banner'
//添加轮播图
var addBanner = api + '/addBanner'
//删除轮播图
var delBanner = api + '/delBanner'
//查询家教轮播图
var teacherBanner = api + '/teacherBanner'
//添加家教轮播
var addTeacherBanner = api + '/addTeacherBanner'
//删除家教轮播
var delTeacherBanner = api + '/delTeacherBanner'
//获取家教类型
var teacherType = api + '/teacherType'
//添加家教类型
var addTeacherType = api + '/addTeacherType'
//删除家教类型
var delTeacherType = api + '/delTeacherType'
//获取家教排行
var teacherTop = api + '/teacherTop'
//添加家教排行
var addTeacherTop = api + '/addTeacherTop'
//删除家教排行
var delTeacherTop = api + '/delTeacherTop'
//获取水站
var findWater = api + '/findWater'
//添加水站
var addWater = api + '/addWater'
//删除水站
var delWater = api + '/delWater'
//更新水站
var updateWater = api + '/updateWater'
//获取水站评论
var findComment = api +'/findComment'
//删除水站评论
var delComment = api +'/delComment'
//获取维修列表
var findRepair = api +'/findRepair'
//添加维修列表
var addRepair = api +'/addRepair'
//删除维修列表
var delRepair = api +'/delRepair'
//更新维修
var updateRepair = api +'/updateRepair'
//获取维修评论
var findRepairComment = api +'/findRepairComment'
//删除维修评论
var delRepairComment = api +'/delRepairComment'
//获取家政轮播图
var homeBanner = api +'/homeBanner'
//添加家政轮播图
var addHomeBanner = api +'/addHomeBanner'
//删除家政轮播图
var delHomeBanner = api +'/delHomeBanner'
//获取家政员工信息
var findHomeWorker = api +'/findHomeWorker'
//添加家政员工信息
var addHomeWorker = api +'/addHomeWorker'
//删除家政员工信息
var delHomeWorker = api +'/delHomeWorker'
//更新员工信息
var updateHomeWorker = api +'/updateHomeWorker'
//获取家政证书接口
var getQualification = api +'/getQualification'
//获取家政服务类型接口
var getHomeType = api +'/getHomeType'
//修改密码
var changePassManage = api +'/changePassManage'
//退出登录
var exit = api +'/exit'

export default {
    login,
    ssManage,
    delManage,
    addManage,
    updateManage,
    banner,
    addBanner,
    delBanner,
    teacherBanner,
    addTeacherBanner,
    delTeacherBanner,
    teacherType,
    addTeacherType,
    delTeacherType,
    teacherTop,
    addTeacherTop,
    delTeacherTop,
    findWater,
    addWater,
    delWater,
    updateWater,
    findComment,
    delComment,
    findRepair,
    addRepair,
    delRepair,
    updateRepair,
    findRepairComment,
    delRepairComment,
    homeBanner,
    addHomeBanner,
    delHomeBanner,
    findHomeWorker,
    addHomeWorker,
    delHomeWorker,
    updateHomeWorker,
    getQualification,
    getHomeType,
    changePassManage,
    exit
}