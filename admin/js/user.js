$(function () {

    // 1. 页面一加载，ajax请求个人详细信息
    $.ajax({
        type: 'get',
        url: bigNews.user_detail,
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            // $('.username').val(backData.data.username);//用户名
            // $('.nickname').val(backData.data.nickname);//昵称
            // $('.email').val(backData.data.email);//邮箱
            // $('.password').val(backData.data.password);//密码
            $('.user_pic').attr('src', backData.data.userPic);//用户头像
            // 遍历对象，解决代码冗余问题
            for (let key in backData.data) {
                // console.log(key);
                // console.log(backData.data[key]);
                $('.' + key).val(backData.data[key]);
            }

        }
    });

    // 2. 文件预览
    //2.1给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //2.2 获取用户选择的图片
        var file = this.files[0];
        //2.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //2.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    // 3. 文件上传
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        $.ajax({
            url: bigNews.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('修改成功！');
                    // window.location.reload(); // 此时的window是user页面的。无法刷新index
                    window.parent.location.reload(); // 返回父窗口，再刷新
                }
            }
        });
    });


});