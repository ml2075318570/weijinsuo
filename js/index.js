 $(function () {
    banner()
    initTab()
})
var banner = function () {
//�������ͼƬ  �ƶ���Сͼ PC�˴�ͼ
//ǰ�˶�̬��Ⱦ�ֲ�ͼ

//    1 ��ȡ����  ģ������  ģ��json����  ��ajax��
//    2 ��Ⱦҳ��
//    2.1 �жϵ�ǰ�豸  ������Ļ�Ŀ�  ������768��px ��width��
//    2.2
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data)
            return false
        }
        $.ajax({
            type: 'get',
            url: 'js/data.json',
            data: {},
            datatype: 'json',
            success: function (data) {
                window.data = data
                callback && callback(data)
            }
        })
    }
    var render = function () {
        getData(function (data) {
            //1 �����ƶ���  0 ���Ƿ��ƶ���
            var isMobile = $(window).width() < 768 ? 1 : 0;
            console.log(isMobile)
            var pointHtml = template('point', {list: data})
            var imageHtml = template('image', {list: data, isM: isMobile})
            $('.carousel-indicators').html(pointHtml)
            $('.carousel-inner').html(imageHtml)
        })
    }
    render()
    $(window).on('resize', function () {
        render()
    })
//    �����л�
    var isMove = false
    var startX = 0
    var distanceX = 0
    /*jquery���¼����������ԭ���¼����� originalEvent */

    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX
        distanceX = moveX - startX
        isMove = true
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                $('.carousel').carousel('prev')
            }
            else {
                $('.carousel').carousel('next')
            }
        }
        isMove = false
        startX = 0
        distanceX = 0
    })

}
var initTab = function () {


    var $navTabs = $('.nav-tabs-parent .nav-tabs');
    var $lis = $navTabs.find('li');
    var widthSum = 0;

    $lis.each(function (index,item) {
        widthSum += $(this).outerWidth(true);

    });
    console.log(widthSum);
    $navTabs.width(widthSum);

    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false
    });
}