/* 
    存储服务器地址
    好处：一旦需要修改，只需要改这个文件，不用改其他文件
*/

// 闭包实现沙箱模式
(function (w) {
    let baseURL = 'http://localhost:8080/api/v1'; //基地址
    let bigNews = {
        user_login: baseURL + '/admin/user/login',
        user_info: baseURL + '/admin/user/info',
    }
    w.bigNews = bigNews;
})(window);