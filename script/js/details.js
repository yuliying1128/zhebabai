;
(function() {
    class getsDetailpagedata {
        constructor() {
            this.head_title = $("head title");
            this.details_main = $('#details_main');
            this.small_pic_img = $('#details_main .details_left .small_pic img');
            this.details_ul = $('#details_main .details_left ul');
            this.datails_headline = $('#details_main .details_middle h1');
            this.datails_subtitle = $('#details_main .details_middle h3');
            this.product_price = $("#details_main .details_middle .product_price strong");
            this.address = $("#details_main .details_middle .address span");
            this.color = $("#details_main .details_middle .color dd");
            this.size = $("#details_main .details_middle .size dd");
            this.number = $('#details_main .details_middle .number dd');
            this.click_buy = $('#details_main .details_middle .click_buy .car');
            this.num = '';
            this.hrefarr = '';
            this.sidarr = '';
            this.sid = '';
            this.colorarr = '';
            this.colorstr = '';
            this.colortitlearr = '';
            this.sizearr = '';
            this.sizestr = '';
            this.detailsbigimgurlarr = '';
            this.detailssmallimgurlarr = '';
            this.detailssmallimgurlstr = '';
            this.switchcolor = false;
            this.switchsize = false;
            this.clickcolor = '';
            this.clicksize = '';
            this.cookiesidarr = [];
            this.cookienumberarr = [];
            this.cookiesizearr = [];
            this.cookiecolorarr = [];
        }
        init() {

            this.hrefarr = location.href.split('?');
            this.sidarr = this.hrefarr[1].split('=');
            this.sid = this.sidarr[1];
            let _this = this;

            this.getdata();


            // this.details_ul.on("click", function(ev) {
            //     _this.eventDelegation(ev)
            // })
            this.color.on('click', function(ev) {
                _this.choicecolor(ev)
            });
            this.size.on('click', function(ev) {
                _this.choicesize(ev)
            });
            this.number.find('p .num_right').on('click', function() {
                _this.num_increase()
            });
            this.number.find('p .num_left').on('click', function() {
                _this.num_reduce()
            });
            this.click_buy.on('click', function() {
                if ($.cookie('zhe800accountNumber')) {
                    _this.shoppingCart();

                } else {
                    alert('还没登录，请登录');
                    window.location.href = "login.html";
                }

                // console.log(_this.cookiesidarr)
                // $.cookie('sid', _this.cookiesidarr, { expires: 7 });
                // console.log($.cookie('sid'))
            });
            // this.shoppingCart()


        }
        getdata() {
                let _this = this;
                $.ajax({
                    url: "http://10.31.164.55/zhebabai/php/getdetail.php",
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        _this.head_title.html(data.indextitle);
                        _this.datails_headline.html(data.indextitle);
                        _this.datails_subtitle.html(data.indextitle);
                        _this.product_price.html(data.indexprice);
                        _this.address.html(data.address);
                        _this.colorarr = data.colorurl.split(",");
                        _this.colortitlearr = data.color.split(",");
                        $.each(_this.colorarr, function(index, value) {
                            _this.colorstr += `
                        <a href="javascript:;"><img src="${_this.colorarr[index]}" title="${_this.colortitlearr[index]}"></a>
                        `;
                        });
                        _this.color.html(_this.colorstr);
                        _this.sizearr = data.size.split(",");
                        $.each(_this.sizearr, function(index, value) {
                            _this.sizestr += `
                        <a href="javascript:;">${_this.sizearr[index]}</a>
                        `;
                        });
                        _this.size.html(_this.sizestr);
                        /* 小图ul */
                        _this.detailssmallimgurlarr = data.detailssmallimgurl.split(",");
                        $.each(_this.detailssmallimgurlarr, function(index, value) {
                            _this.detailssmallimgurlstr += `
                        <li>
                            <a href="javascript:;"><img src="${_this.detailssmallimgurlarr[index]}"></a>
                        </li>
                        
                        `;
                        });
                        _this.details_ul.html(_this.detailssmallimgurlstr);

                        /*大图效果*/
                        _this.detailsbigimgurlarr = data.detailsbigimgurl.split(",");
                        _this.small_pic_img.attr("src", _this.detailsbigimgurlarr[0]);

                        _this.details_ul.on("click", function(ev) {

                            /* 点击更换图片，事件委托 */
                            var ev = ev || window.event;
                            var element = ev.target || ev.srcElement;
                            _this.details_ul.find('img').each(function(index, element) {
                                $(element).attr('a', index);
                            });
                            if (element.nodeName == 'IMG') {
                                _this.small_pic_img.attr("src", _this.detailsbigimgurlarr[$(element).attr('a')]);
                            }
                        })

                    }
                })
            }
            // eventDelegation(ev) {
            //     /* 点击更换图片，事件委托 */
            //     var ev = ev || window.event;
            //     var element = ev.target || ev.srcElement;
            //     _this.details_ul.find('img').each(function(index, element) {
            //         $(element).attr('a', index);
            //     });
            //     if (element.nodeName == 'IMG') {
            //         /* console.log($(element).attr('a')) */
            //         _this.small_pic_img.attr("src", _this.detailsbigimgurlarr[$(element).attr('a')]);
            //     }
            // }
        choicecolor(ev) {
            var ev = ev || window.event;
            var element = ev.target || ev.srcElement;
            this.color.find('a').css({
                'border-width': "1px",
                'border-style': "solid",
                'border-color': "#ccc"
            });
            if (element.nodeName == 'IMG') {
                $(element).parent('a').css({
                    'border-width': "1px",
                    'border-style': "solid",
                    'border-color': "#e02f2f"
                });
                this.clickcolor = $(element).attr('title')
            }
            // console.log($(element).attr('title'))
            this.switchcolor = true;
        }
        choicesize(ev) {
            var ev = ev || window.event;
            var element = ev.target || ev.srcElement;
            this.size.find('a').css({
                'border-width': "1px",
                'border-style': "solid",
                'border-color': "#ccc"
            });
            if (element.nodeName == 'A') {
                $(element).css({
                    'border-width': "1px",
                    'border-style': "solid",
                    'border-color': "#e02f2f"
                });
                this.clicksize = $(element).html();
            }
            this.switchsize = true;
        }
        num_increase() {
            this.num = parseInt($(this.number).find('input').val());
            this.num++;
            if (this.num > 1) {
                this.number.find('p .num_left').css({
                    'background-img': "url(../img/p_Spirit6.b652a725.png)",
                    'background-position': "-1px -210px"
                })
            }
            this.number.find('input').attr('value', this.num);
        }
        num_reduce() {
            this.num = parseInt($(this.number).find('input').val());
            this.num--;
            if (this.num <= 1) {
                this.num = 1;
                this.number.find('p .num_left').css({
                    'background-img': "url(../img/p_Spirit6.b652a725.png)",
                    'background-position': "-1px -179px"
                })
            };
            this.number.find('input').attr('value', this.num);
        }
        shoppingCart() {

            if (this.switchcolor == true && this.switchsize == true) {


                if ($.cookie('sid') && $.cookie('number')) {
                    console.log($.cookie('sid'))
                    this.cookiesidarr = $.cookie('sid').split(',');
                    this.cookienumberarr = $.cookie('number').split(',');
                    this.cookiecolorarr = $.cookie('color').split(',');
                    this.cookiesizearr = $.cookie('size').split(',');


                    this.cookiesidarr.push(this.sid);
                    this.cookienumberarr.push(this.number.find('input').val());
                    this.cookiecolorarr.push(this.clickcolor);
                    console.log(this.cookiesidarr);
                    this.cookiesizearr.push(this.clicksize);
                    // this.cookiesidarr.push(this.sid);
                    $.cookie('sid', this.cookiesidarr, { expires: 7 });
                    $.cookie('number', this.cookienumberarr, { expires: 7 });
                    $.cookie('color', this.cookiecolorarr, { expires: 7 });
                    $.cookie('size', this.cookiesizearr, { expires: 7 });
                    window.location.href = "cart.html";

                } else {
                    this.cookiesidarr.push(this.sid);
                    this.cookienumberarr.push(this.number.find('input').val());
                    this.cookiecolorarr.push(this.clickcolor);
                    this.cookiesizearr.push(this.clicksize);
                    // console.log(this.cookiesidarr)
                    $.cookie('sid', this.cookiesidarr, { expires: 7 });
                    $.cookie('number', this.cookienumberarr, { expires: 7 });
                    $.cookie('color', this.cookiecolorarr, { expires: 7 });
                    $.cookie('size', this.cookiesizearr, { expires: 7 });

                    window.location.href = "cart.html";
                }

            } else {
                alert("请选择颜色或尺码");
            }
        }

    }
    new getsDetailpagedata().init();
})();
/* 获取主页的sid进行详情页内容渲染 */
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