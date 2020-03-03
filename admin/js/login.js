$(function () {



    // 当用户名和密码都不为空时
    $('.input_sub').click(function (e) {

        // 阻止默认提交
        e.preventDefault();

        // 先判断用户名或者密码不能为空
        if ($('.input_txt').val() == '' || $('.input_pass').val() == '') {
            $('#myModal').modal();
            $('.modal-body').text('用户名或密码不能为空！');
            return;
        }

        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: {
                username: $('.input_txt').val(),
                password: $('.input_pass').val()
            },
            dataType: 'json',
            success: function (backData) {
                if (backData.code == 200) {
                    // 用户名密码正确之后跳转到首页
                    $('#myModal').modal();
                    $('.modal-body p').text(backData.msg);
                    // 点击模态框的确认按钮，才发生页面跳转
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 1. 将token存入本地(localStorage永久存储)
                        localStorage.setItem('token', backData.token);
                        window.location.href = './index.html';
                    })
                } else {
                    $('#myModal').modal();
                    $('.modal-body p').text(backData.msg);
                }
            }
        });

    });

});