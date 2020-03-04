$(function () {

    /* ============将以下代码直接写入jQuery中============ */

    //  ajax全局配置：就是给所有的ajax添加默认设置(请求头) 原理：原型链

    // ===== ajaxSetup() 方法为将来的 AJAX 请求设置默认值. =====
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

    // 1. ajax请求获取用户信息
    $.ajax({
        type: 'get',
        url: bigNews.user_info,
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

    // 2.改主页侧边栏点击样式
    // 2.1 一级菜单的点击事件
    $('.level01').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        // 2.2 如果点击的是第二个一级菜单，此时还需要一个下拉的动画
        if ($(this).index() == 1) {
            // 让右侧小箭头相应的旋转
            $('.icon-arrowdownl').toggleClass('rotate0');
            // 二级菜单下拉或上滑
            $('.level02').slideToggle();
            // 打开二级菜单时，首先默认第一个高亮
            $('.level02 li:eq(0) a')[0].click();
        } else {// 如果点击的不是二级菜单，需要取消二级菜单的高亮
            $('.level02 li').removeClass('active');
        }
    });

    // 2.2 二级菜单的点击样式
    $('.level02 li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 3.退出主页
    $('.logout').click(function () {
        // 移出token
        localStorage.removeItem('token');
        // 移出后，跳转登录页
        window.location.href = './login.html';
    });

});