;(function($){
    
    var $louti=$('#loutinav');
    var $loutinav=$('#loutinav li');//楼梯导航
    var $loucent=$('.louceng');
    var $last=$('.last');


    $(window).on('scroll',function(){
        //1.添加滚轮事件，显示隐藏左侧的楼梯导航
        var $top=$(window).scrollTop();//滚动条的top值
        if($top>=750){
            $louti.show();
        }else{
            $louti.hide();
        }

        //4.通过滚轮事件，给楼层对应的楼梯添加active.
        //条件：只要楼层对应的top大于滚动条的top，添加active.
        $loucent.each(function(index,element){
            var loucengtop=$(element).offset().top+$(element).outerHeight()/2;
            //console.log(loucengtop);

            if(loucengtop>$top){
                $loutinav.not('.last').removeClass('active');//移出楼梯导航上面所有的类
                $loutinav.not('.last').eq(index).addClass('active');//楼层对应的楼梯导航添加类。
                return false;//每次触发滚轮，只有一个楼梯导航添加对应的类(有一个楼梯满足立刻终止循环) 
            }
        });



    });

    //2.点击左侧楼梯导航，切换对应的楼层。
    //点击楼梯导航，获取和当前楼梯导航对应的楼层的top值，赋值给浏览器滚动条
    $loutinav.not('.last').on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        var $top=$loucent.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop:$top
        });
    });

    //3.回到顶部
    $last.on('click',function(){
        $('html,body').animate({
            scrollTop:0
        });
    });




})(jQuery);