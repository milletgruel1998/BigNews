$(function () {

    /* ============将以下代码直接写入jQuery中============ */

    //  ajax全局配置：给所有的ajax添加默认设置(请求头) 

    // $.ajaxSetup({
    //     // 所有的ajax发送之前会执行这个函数(一般在这里设置默认请求头)
    //     beforeSend: function (xhr) {
    //         // 1. 设置请求头
    //         xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    //     },
    //     // 2. ajax报错就会进入这里
    //     error: function (xhr, status, error) {
    //         console.log(xhr);
    //         console.log(status);
    //         console.log(error);
    //         if (error == 'Forbidden') {
    //             alert('请先登录！');
    //             window.location.href = './login.html';
    //         }
    //     }
    // });

    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // 将服务器返回的数据渲染到页面
            $('.user_info>span').text('欢迎 ' + backData.data.nickname);
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_center_link>img').attr('src', backData.data.userPic)
        }
    });

    /* 原生 */
    // //(1).实例化ajax对象
    // var xhr = new XMLHttpRequest();
    // //(2).设置请求方法和地址
    // //get请求的数据直接添加在url的后面 格式是 url?key=value
    // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info');

    // /* 原生写请求头 */
    // // 设置请求头
    // xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    // //(3).发送请求
    // xhr.send();
    // //(4).注册回调函数
    // xhr.onload = function () {
    //     console.log(xhr.responseText)
    // };

});