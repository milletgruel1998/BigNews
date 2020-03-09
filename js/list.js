$(function () {

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
            $('.hotrank_list').html(template('hot_ranking', backData));
            $('.hotrank_list').find('li:eq(0)>span').addClass('first');
            $('.hotrank_list').find('li:eq(1)>span').addClass('second');
            $('.hotrank_list').find('li:eq(2)>span').addClass('third');
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

    // 文章搜索
    $('.search_btn').click(function () {
        $.ajax({
            type: 'get',
            url: bigNews.article_search,
            data: {
                key: $('.search_txt').val(),
            },
            dataType: 'json',
            success: function (backData) {
                /* 渲染页面 */
                $('.article_content').html(template('news_list', backData));

                // ajax分页
                // 1. 首先销毁之前旧的分页插件
                $('#pagination').twbsPagination('destroy');
                // 2. 生成新的分页插件
                $('#pagination').twbsPagination({
                    totalPages: Math.ceil(backData.data.totalCount / 6), // 总页数
                    visiblePages: 8, // 可见页数
                    startPage: 1, //起始页
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页',
                    onPageClick: function (event, page) {
                        $('#page-content').text('Page ' + page);
                        /* 点击第几页，向服务器请求第几页的数据 */
                        $.ajax({
                            type: 'get',
                            url: bigNews.article_search,
                            data: {
                                key: $('.search_txt').val(),
                                page: page
                            },
                            dataType: 'json',
                            success: function (backData) {
                                $('.article_content').html(template('news_list', backData));

                            }
                        });

                    }
                });

            }
        });
    });
    
    /* 进入页面先执行一次按钮的点击事件 */
    $('.search_btn').click();

});
