;
(function() {
    class matchedData {
        constructor() {
            this.user = $('#main form ul li input').eq(0);
            this.pass = $('#main form ul li input').eq(1);
            this.sub = $('#main form ul li span');
            this.drag = $('#main form ul li .sliding_block');
            this.slide = $('#main form ul li .slide_box');
            this.userswitch = false;
            this.passswitch = false;
            this.dragswitch = false;
        }
        init() {
            let _this = this;
            // console.log(this.sub);
            this.drag.on('mousedown', function(ev) {
                var ev = ev || window.event;
                _this.down(ev);
                $(document).on('mousemove', function(ev) {
                    var ev = ev || window.event
                    _this.move(ev);
                    $(document).on('mouseup', function() {
                        _this.up()
                    });
                    return false
                })
            });
            this.sub.on('click', function() {
                if (_this.user.val() != '') {
                    _this.userswitch = true;
                }
                if (_this.pass.val() != '') {
                    _this.passswitch = true;
                }
                _this.loginAuthentication();
                return false
            })
        }
        down(ev) {
            this.sx = ev.offsetX;
        }
        move(ev) {
            var l = ev.clientX - this.slide.offset().left - this.sx
            if (l < 0) {
                l = 0
            } else if (l > this.slide.width() - this.drag.width()) {
                l = this.slide.width() - this.drag.width()
            }
            this.drag.css('left', l);
            if (l == this.slide.width() - this.drag.width()) {
                this.slide.html('验证通过');
                this.slide.css({
                    'background': '#80ff00',
                    "color": "#fff",
                })
                this.dragswitch = true;
            }
        }
        up() {
            $(document).off('mousemove');
            $(document).off('mouseup');
        }
        loginAuthentication() {
            let _this = this;
            if (this.userswitch == true && this.passswitch == true && this.dragswitch == true) {
                $.ajax({
                    url: "http://10.31.164.55/zhebabai/php/login.php",
                    type: "POST",
                    data: {
                        user: _this.user.val(),
                        pass: _this.pass.val(),
                    },
                    success: function(data) {
                        if (Boolean(data)) {
                            $.cookie('zhe800accountNumber', _this.user.val(), { expires: 7 });
                            window.location.href = "index.html"
                        } else {
                            alert('用户名或密码错误,请重试')
                        }
                    }
                })
            } else {
                alert('请输入通行证用户名、密码和滑块验证')
            }
        }
    }
    new matchedData().init()
})();