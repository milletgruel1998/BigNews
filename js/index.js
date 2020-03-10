$(function () {

    // 首页焦点图
    $.ajax({
        type: 'get',
        url: bigNews.index_focusPic,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.focus_list').html(template('focusPic', backData)).children('li:eq(0)').addClass('first');
        }
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

    // 最新资讯
    $.ajax({
        type: 'get',
        url: bigNews.index_nowInfo,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.common_news').html(template('nowInfo', backData));
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
            console.log(backData);
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

    // 菜单下拉列表
    // $('.level_two').on('click', '.article_cate', function () {
    //     // 文章搜索
    //     $.ajax({
    //         type: 'get',
    //         url: bigNews.article_search,
    //         dataType: 'json',
    //         success: function (backData) {
    //             console.log(backData);
    //         }
    //     });
    // });

});