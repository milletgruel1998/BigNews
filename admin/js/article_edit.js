$(function () {

    /* 富文本编辑器js代码 */
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();
    // // 设置内容
    // editor.txt.html('<p>用 JS 设置的内容</p>');
    // // 获取内容
    // console.log(editor.txt.html());


    /* ajax请求文章类别 */
    $.ajax({
        type: 'get',
        url: bigNews.allArticle_category,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.category').html(template('article_category', backData));
        }
    });

    /* ajax请求编辑页面数据 */
    $.ajax({
        type: 'get',
        url: bigNews.article_gain,
        data: {
            id: window.location.href.split('?')[1].split('=')[1]
        },
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('#inputTitle').val(backData.data.title); //文章标题
            $('.article_cover').attr('src', backData.data.cover);//文章封面
            $('#testico').val(backData.data.date);//文章发布时间
            editor.txt.html(backData.data.content); // 文章内容
            $('.category').val(backData.data.categoryId);//当前文章的类别
        }
    });

    /* 文件预览 */
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });

    /* 文件上传 */

    // 修改
    $('.btn-edit').click(function (e) {
        // 阻止表单默认事件
        e.preventDefault();
        article_upload('已发布');
    });
    // 存为草稿
    $('.btn-draft').click(function (e) {
        // 阻止表单默认事件
        e.preventDefault();
        article_upload('草稿');
    });

    /* 存在的问题
        (1) formdata只能获取有name属性的表单元素的值(如果input没有设置name属性,formdata无法获取)
        (2) 接口文档参数 > formdata获取的参数
            *解决方案(1) 使用input隐藏域(适合少量参数,例如id少了)
            *解决方案(2) 使用append()方法手动追加参数(适合大量参数)
     */
    function article_upload(state) { // 修改还是存为草稿
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 手动添加参数
        fd.append('id', window.location.href.split('?')[1].split('=')[1]); // 文章id
        fd.append('date', $('#testico').val()); // 日期时间
        fd.append('content', editor.txt.html());
        fd.append('state', state);
        //ajax请求
        $.ajax({
            url: bigNews.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert(backData.msg);
                    window.location.href = './article_list.html';
                }
            }
        });
    }

});