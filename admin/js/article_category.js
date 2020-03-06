$(function () {

    // 1.查询所有类别
    $.ajax({
        type: 'get',
        url: bigNews.allArticle_category,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.category_table>tbody').html(template('category', backData));
        }
    });

    // 2.修改模态框确认按钮的文本(新增或编辑)
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget);
        if ($(e.relatedTarget).text() == '新增分类') {
            // 2.1 新增文章类别
            $('.btn-primary').text('新增');
        } else {
            // 2.2 编辑文章类别
            $('.btn-primary').text('编辑');

            // 2.3 页面传值(显示当前编辑的分类信息)
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            $('#message-text').val($(e.relatedTarget).parent().prev().text());

            // 2.4 将编辑按钮的id值赋值给模态框的确认按钮
            $('.btn-primary').attr('newAdd_id', $(e.relatedTarget).attr('data_id'));

        }
    })

    // 模态框按钮取消时间，前将之前的内容清空掉
    $('.btn_cancel').click(function () {
        $('.modal-body>form')[0].reset();
    });

    // 模态框确实按钮事件---是新增按钮就执行新增ajax,是编辑按钮就执行编辑ajax
    $('.btn_confirm').click(function () {
        if ($(this).text() == '新增') {
            // 3.1 新增类别
            $.ajax({
                type: 'post',
                url: bigNews.addArticle_category,
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val()
                },
                dataType: 'json',
                success: function (backData) {
                    if (backData.code == 201) {
                        alert(backData.msg);
                        window.location.reload();
                    }
                }
            });
        } else {
            // 3.2 编辑类别
            $.ajax({
                type: 'post',
                url: bigNews.editArticle_category,
                data: {
                    id: $(this).attr('newadd_id'),
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                },
                dataType: 'json',
                success: function (backData) {
                    if (backData.code == 200) {
                        alert(backData.msg);
                        window.location.reload();
                    }
                }
            });
        }
    });

    // 4. 删除类别
    $('tbody').on('click', '.delete', function () {

        $.ajax({
            type: 'post',
            url: bigNews.deleteArticle_category,
            data: {
                id: $(this).attr('data_id'),
            },
            dataType: 'json',
            success: function (backData) {
                if (backData.code == 204) {
                    alert(backData.msg);
                    window.location.reload();
                }
            }
        });

    });

});