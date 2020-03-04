$(function () {

    // 页面一加载，ajax请求个人详细信息
    $.ajax({
        type: 'get',
        url: bigNews.user_detail,
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
        }
    });


});