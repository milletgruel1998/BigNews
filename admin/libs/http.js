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
        allArticle_category: baseURL + '/admin/category/list',//所有文章类别
        addArticle_category: baseURL + '/admin/category/add',//新增文章类别
        editArticle_category: baseURL + '/admin/category/edit', // 编辑文章类别
        deleteArticle_category: baseURL + '/admin/category/delete',//删除文章类别
        article_query: baseURL + '/admin/article/query', //文章搜索
        article_delete: baseURL + '/admin/article/delete',//文章删除
        article_gain: baseURL + '/admin/article/search',// 文章信息获取
        article_edit: baseURL + '/admin/article/edit',// 文章编辑
        article_release: baseURL + '/admin/article/publish',// 文章发布
    }
    w.bigNews = bigNews;
})(window);