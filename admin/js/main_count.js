$(function () {

    // 日新增文章数量统计
    $.ajax({
        type: 'get',
        url: bigNews.article_data,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.spannel:eq(0)>em').text(backData.totalArticle); // 文章总数
            $('.spannel:eq(1)>em').text(backData.dayArticle); // 日新增文章数
            $('.spannel:eq(2)>em').text(backData.totalComment);//总评论数
            $('.spannel:eq(3)>em').text(backData.dayComment);//日新增评论数
        }
    });

});