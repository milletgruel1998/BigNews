$(function () {

    /* 1. 请求评论列表 */
    $.ajax({
        type: 'get',
        url: bigNews.comment_list,
        data: {
            // page:'', // page为空，默认返回第一页
            perpage: 8, // 每页显示的条数
        },
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('tbody').html(template('comment_list', backData));

            /* 2. 加载分页插件 */
            $('#pagination').twbsPagination({
                totalPages: backData.data.totalPage, // 总页数
                visiblePages: 8, // 可见页数
                startPage: 1, //起始页
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '尾页',
                onPageClick: function (event, page) {
                    $('#page-content').text('Page ' + page);
                    // console.log(page);
                    getNewPage(page);
                }
            });
        }
    });

    // 获得的当前页数
    function getNewPage(nowPage) {
        $.ajax({
            type: 'get',
            url: bigNews.comment_list,
            data: {
                page: nowPage,
                perpage: 8
            },
            dataType: 'json',
            success: function (backData) {
                // console.log(backData);
                $('tbody').html(template('comment_list', backData));
            }
        });
    }

    /* 3. 批准 */
    $('tbody').on('click', '.agree_comment', function () {

        $.ajax({
            type: 'post',
            url: bigNews.comment_agree,
            data: {
                id: $(this).attr('data_id')
            },
            dataType: 'json',
            success: function (backData) {
                console.log(backData);
                // console.log($(this));
                if (backData.code == 200) {
                    alert(backData.msg);
                }
            }
        });
        // 批准后，将该按钮的文本值该为拒绝，并且更改按钮背景色
        $(this).text('拒绝').removeClass('btn-success').addClass('btn-warning');
        // 批准后，将该按钮所在的tr下面的状态修改为已通过
        $(this).parent().prev().text('已通过');
    });

    /* 4. 拒绝 */

    $('tbody').on('click', '.refuse_comment', function () {
        $.ajax({
            type: 'post',
            url: bigNews.comment_refuse,
            data: {
                id: $(this).attr('data_id')
            },
            dataType: 'json',
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                }
            }
        });
        // 点击拒绝按钮，让该按钮所在的tr下面的文章状态改为已拒绝
        $(this).parent().prev().text('已拒绝');
        // 同时隐藏拒绝按钮
        $(this).hide();
    });

    /* 5. 删除 */


});