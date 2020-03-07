$(function () {

    /* 1. 请求文章类别 */
    $.ajax({
        type: 'get',
        url: bigNews.allArticle_category,
        dataType: 'json',
        success: function (backData) {
            $('.category').html(template('article_category', backData));
        }
    });

    /* 2 富文本编辑器js代码 */
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();

    /* 3. 文件预览 */
    // 3.1 给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //3.2 获取用户选择的图片
        var file = this.files[0];
        //3.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //3.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });

    /* 4. 文件上传 */

    // 4.1 发布
    $('.btn-release').click(function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        article_release('已发布');
    });

    // 4.2 存为草稿
    $('.btn-draft').click(function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        article_release('草稿');
    });

    function article_release(state) {
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 手动添加参数
        fd.append('date', $('#testico').val()); // 发布日期
        fd.append('content', editor.txt.html());// 富文本内容
        fd.append('state', state);//文章状态
        $.ajax({
            url: bigNews.article_release,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert(backData.msg);
                    // 发布成功后跳转到文章列表页
                    window.location.href = './article_list.html';
                    $('.level02>li:eq(0)', window.parent.document).addClass('active').siblings().removeClass('active');
                }
            }
        });
    }

});