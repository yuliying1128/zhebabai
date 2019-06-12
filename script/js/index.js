;
(function() {
    class activityNavigation {
        constructor() {
            this.activity_navigation = $('#activity_navigation');
            this.header = $('#header');
            this.search = $('#search');
            this.nav = $('nav');
            this.top = this.header.height() + this.search.height() + this.nav.height() + parseInt(this.search.css('padding-top')) * 2
        }
        init() {
            this.scrollTop()
        }
        scrollTop() {
            let _this = this;
            $(window).on('scroll', function() {
                if ($(window).scrollTop() >= _this.top) {
                    $(this.activity_navigation).show()
                } else {
                    $(this.activity_navigation).hide()
                }
            })
        }
    }
    new activityNavigation().init()
})();
/* 网页顶部活动导航效果 */
;
(function() {
    class bannerMove {
        constructor() {
            this.banner = $('#banner');
            this.banner_pic = $('.banner_pic');
            this.btn = $('.banner_pic p span');
            this.num = 0;
        }
        init() {
            this.banner_pic.find('ul').width(this.banner_pic.width() * 5);
            this.buttonClick();
            this.selfMotion();
        }
        buttonClick() {
            let _this = this;
            this.btn.on('click', function() {
                _this.num = $(this).index()
                _this.btn.removeClass('active');
                _this.btn.eq(_this.num).addClass('active');
                _this.banner_pic.find('ul').animate({
                    left: -$(this).index() * $('.banner_pic ul li').width()
                })
            })
        }
        selfMotion() {
            let _this = this;
            let $timer = setInterval(() => {
                this.num++;
                if (this.num == this.btn.length) {
                    this.num = 0
                };
                _this.btn.removeClass('active');
                _this.btn.eq(_this.num).addClass('active');
                this.banner_pic.find('ul').animate({
                    left: -_this.num * $('.banner_pic ul li').width()
                })
            }, 3000);
            this.banner_pic.hover(function() {
                clearInterval($timer)
            }, function() {
                $timer = setInterval(() => {
                    _this.num++;
                    if (_this.num == _this.btn.length) {
                        _this.num = 0
                    };
                    _this.btn.removeClass('active');
                    _this.btn.eq(_this.num).addClass('active');
                    _this.banner_pic.find('ul').animate({
                        left: -_this.num * $('.banner_pic ul li').width()
                    })
                }, 4000);
            })
        }
    }
    new bannerMove().init()
})();
/* banner效果 */
;
(function() {
    class dataRendering {
        constructor() {
            this.update = $('#update');
            this.data_information = $('#update .wrapper .update_product .data_information');
            this.arrydata = '';
        }
        init() {
            this.getdata();
        }
        getdata() {
            let _this = this;
            $.ajax({
                url: "http://10.31.164.55/zhebabai/php/homePagegetdata.php",
                dataType: 'json',
                success: function(data) {
                    $.each(data, function(index, value) {
                        _this.arrydata += `
                        <li>
                            <a href="details.html?sid=${data[index].sid}" target="_blank">
                                <img class="lazy" data-original="${data[index].indeximgurl}" width="283px" height="283px">
                                <p href="#" title="${data[index].indextitle}">${data[index].indextitle}</p>
                                <span>¥<em>${data[index].indexprice}</em></span>
                                <i>剩余<strong>${data[index].indextime}</strong>天</i>
                            </a>
                        </li>
                        `;
                        _this.data_information.find('ul').html(_this.arrydata);
                        $(function() {
                            $("img.lazy").lazyload({
                                effect: "fadeIn"
                            });
                        });
                    })
                }
            })
        }
    }
    new dataRendering().init()
})();
/* 主页数据渲染和懒加载 */
;
(function() {
    class Quantityofgoods {
        constructor() {
            this.cartnum = $('#header ul a strong');
            this.sidercartnum = $('#sidebar .sidebar_top em');
            this.sidarr = [];

        }
        init() {

            if ($.cookie('sid') && $.cookie('zhe800accountNumber')) {
                this.sidarr = $.cookie('sid').split(',');
                this.cartnum.html(this.sidarr.length);
                this.sidercartnum.html(this.sidarr.length)
            } else {
                this.cartnum.html(0);
                this.sidercartnum.html(0)
            }

        }
    }
    new Quantityofgoods().init()
})()
/* 从cookie中获取数据 购物车商品数量显示 */
;
(function() {
    class Jumpcart {
        constructor() {
            this.carthref = $('#header ul li').eq(2).find('a');
        }
        init() {
            if ($.cookie('zhe800accountNumber')) {
                this.carthref.attr('href', 'cart.html');
            } else {
                this.carthref.on('click', function() {
                    alert('还没登录，请登录');
                });
                this.carthref.attr('href', 'login.html');
            }
        }
    }
    new Jumpcart().init()
})()
/* 判断是否登录，不登陆跳转不到购物车 跳转登录页面 */