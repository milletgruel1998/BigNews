$(function () {

    // 文章id
    let id = window.location.href.split('=')[1];

    // 文章详细内容
    $.ajax({
        type: 'get',
        url: bigNews.article_detailCon,
        data: {
            id: id
        },
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.article_detail').html(template('article_Con', backData));
        }
    });

    // 评论列表
    $.ajax({
        type: 'get',
        url: bigNews.article_commentList,
        data: {
            articleId: id
        },
        dataType: 'json',
        success: function (backData) {
            $('.comment_list_con').html(template('comment_list_content', backData));
            $('.comment_count').text(backData.data.length + '条评论');
        }
    });

    // 发表评论
    $('.comment_sub').click(function (e) {
        // 阻止表单默认跳转
        e.preventDefault();

        // 非空判断
        if ($('.comment_name').val() == '' || $('.comment_input').val() == '') {
            alert('用户名或内容不可为空！');
            return false;
        }

        $.ajax({
            type: 'post',
            url: bigNews.release_comment,
            data: {
                author: $('.comment_name').val(),
                content: $('.comment_input').val(),
                articleId: id
            },
            dataType: 'json',
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 201) {
                    alert(backData.msg);
                }
                $('.comment_name').val('');
                $('.comment_input').val('');
            }
        });

    });

    // 文章类型
    $.ajax({
        type: 'get',
        url: bigNews.index_articleCategory,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.level_two').html(template('article_category', backData));
            $('.left_menu').html(template('article_category', backData));
        }
    });

    // 热门排行
    $.ajax({
        type: 'get',
        url: bigNews.hot_ranking,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.hot_ranking').html(template('hot_ranking', backData));
        }
    });

    // 最新评论
    $.ajax({
        type: 'get',
        url: bigNews.now_comment,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.comment_list').html(template('now_comment', backData));
        }
    });

    // 焦点关注
    $.ajax({
        type: 'get',
        url: bigNews.focus_attention,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.guanzhu_list').html(template('focus_attention', backData));
        }
    });


});