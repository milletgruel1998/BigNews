$(function () {

    /* 1. ajax请求所有分类 */
    $.ajax({
        type: 'get',
        url: bigNews.allArticle_category,
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            /* 模版引擎渲染页面 */
            $('#selCategory').html(template('allCategory', backData));
        }
    });


    /* 2. 筛选按钮：查询文章列表 */
    $('#btnSearch').click(function (e) {
        // 筛选按钮是在form表单中,需要阻止默认跳转
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: bigNews.article_query,
            dataType: 'json',
            data: {
                type: $('#selCategory').val(), // 文章每个类别的id
                state: $('#selStatus').val(), // 文章状态
                page: 1, // 起始页
                perpage: 8 // 每页的个数
            },
            success: function (backData) {
                // console.log(backData);
                /* 模版引擎渲染页面 */
                $('.article_table>tbody').html(template('article_list', backData));

                /* 3. 分页查询 */
                // 先清除旧的分页插件
                $('#pagination').twbsPagination('destroy');
                // 再加载新的分页插件
                $('#pagination').twbsPagination({
                    totalPages: backData.data.totalPage, // 总页数
                    visiblePages: 8, // 可见页数
                    startPage: 1, //起始页
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页',
                    onPageClick: function (event, page) { //当前的页码
                        $('#page-content').text('Page ' + page);
                        // console.log(page); 
                        showArticlePage(page);

                    }
                });
            }
        });

    });
    // 页面初始先主动请求一次查询文章列表
    $('#btnSearch').click();

    // 封装函数：渲染点击页码对应的页面
    function showArticlePage(clickPage) {
        $.ajax({
            type: 'get',
            url: bigNews.article_query,
            dataType: 'json',
            data: {
                type: $('#selCategory').val(), // 文章每个类别的id
                state: $('#selStatus').val(), // 文章状态
                page: clickPage, // 起始页
                perpage: 8 // 每页的个数
            },
            success: function (backData) {
                /* 模版引擎渲染页面 */
                $('.article_table>tbody').html(template('article_list', backData));
            }
        });
    }

    /* 4. 删除文章 */
    $('tbody').on('click', '.delete', function () {
        $.ajax({
            type: 'post',
            url: bigNews.article_delete,
            data: { id: $(this).attr('data_id') },
            dataType: 'json',
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 204) {
                    alert(backData.msg);
                    window.location.reload();
                }
            }
        });
    });

    // 点击文章列表中的发表文章让主页侧边栏中的发表文章高亮
    $('#release_btn').click(function () {
        /* 问题：嵌套页面如何获取主页面的元素
            $('选择器',window.document)：在当前页面DOM树中查找元素
            $('选择器',window.parent.document)：在父页面DOM树中查找元素 
        */
        $('.level02>li:eq(1)', window.parent.document).addClass('active').siblings().removeClass('active');
    });

});