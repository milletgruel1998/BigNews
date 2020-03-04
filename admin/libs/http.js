/* 
    存储服务器地址
    好处：一旦需要修改，只需要改这个文件，不用改其他文件
*/

// 闭包实现沙箱模式
(function (w) {
    let baseURL = 'http://localhost:8080/api/v1'; //基地址
    let bigNews = {
        baseURL: baseURL,// 基地址
        user_login: baseURL + '/admin/user/login',// 用户登录
        user_info: baseURL + '/admin/user/info',// 用户信息
        user_detail: baseURL + '/admin/user/detail',//用户详情
        user_edit: baseURL + '/admin/user/edit',//修改用户信息
    }
    w.bigNews = bigNews;
})(window);