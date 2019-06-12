// ;
// (function() {
//     class formValidation {
//         constructor() {
//             this.em = $('#main form dl dd em');
//         }
//         init() {
//             this.tel();
//             this.verification();
//         }
//         tel() {
//             jQuery.validator.addMethod("isPhone", function(value, element) {
//                 var length = value.length;
//                 var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
//                 return this.optional(element) || (length == 11 && mobile.test(value));
//             }, "请填写正确的手机号码");
//         }
//         verification() {
//             $(function() {
//                 $('#register').validate({
//                     rules: {
//                         tel: {
//                             isPhone: true,
//                             required: true,

//                         },
//                         password: {
//                             required: true,
//                             minlength: 6,
//                             maxlength: 24,
//                         }
//                     },
//                     messages: {
//                         tel: {
//                             required: '请输入手机号码',
//                         },
//                         password: {
//                             required: '请输入密码',
//                             minlength: '6-24位字母数字',
//                             maxlength: '6-24位字母数字',
//                         }
//                     }
//                 })
//             });
//             $.validator.setDefaults({
//                 /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
//                 success: function(label) {
//                     label.text('√').css('color', 'green').addClass('valid');
//                 }
//             });
//         }
//     }
//     new formValidation().init()
// })();
// /* 表单验证 */

;
(function() {
    class formValidation {
        constructor() {
            this.em = $('#main form dl dd em');
            this.input = $('#main dl dd input');
            this.label = $('#main dl dd label');
            this.drag = $('#main dl dd .sliding_block');
            this.slide = $('#main dl dd .slide_box');
            this.checkbox = $('#main dl dd .checkbox');
            this.submit = $('#main dl dd i');
            this.sx = null;
            this.telswitch = false;
            this.passwordswitch = false;
            this.confirmswitch = false;
            this.dragswitch = false;
        }
        init() {
            let _this = this;
            this.verification();
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
            // console.log(this.submit)
            this.submit.on('click', function() {
                _this.submitInformation();
            })

        }
        verification() {
            let _this = this;
            // console.log(this.input.eq(0))
            this.input.eq(0).focus(function() {
                _this.label.eq(0).html('为了您的账号安全，请填写常用手机号');
                _this.label.eq(0).css('color', '#666');
            });

            this.input.eq(0).blur(function() {
                // console.log(_this.input.eq(0).val())
                if (_this.input.eq(0).val() != '') {
                    if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(_this.input.eq(0).val())) {
                        _this.em.eq(0).show();
                        _this.label.eq(0).html('');
                        _this.telswitch = true;

                    } else {
                        _this.em.eq(0).hide();
                        _this.label.eq(0).html('手机号码格式错误');
                        _this.label.eq(0).css('color', '#e02f2f');
                    }
                } else {
                    _this.label.eq(0).html('请输入手机号码');
                    _this.label.eq(0).css('color', '#e02f2f');
                }
            });
            /* 验证手机号 */
            this.input.eq(1).focus(function() {
                _this.label.eq(1).html('6-24位字母、数字或半角符号');
                _this.label.eq(1).css('color', '#666');
            });

            this.input.eq(1).blur(function() {
                // console.log(_this.input.eq(0).val())
                if (_this.input.eq(1).val() != '') {
                    if (/(?!^[0-9]{6,24}$)^[0-9A-Za-z\u0020-\u007e]{6,24}$/.test(_this.input.eq(1).val())) {
                        _this.em.eq(1).show();
                        _this.label.eq(1).html('');
                        _this.passwordswitch = true;
                    } else {
                        _this.em.eq(1).hide();
                        // console.log(_this.input.eq(1).val().split('').length)
                        if (_this.input.eq(1).val().split('').length < 6) {
                            _this.label.eq(1).html('密码过短，最短支持6个字符');
                            _this.label.eq(1).css('color', '#e02f2f');
                        } else if (_this.input.eq(1).val().split('').length > 24) {
                            _this.label.eq(1).html('密码过长，最长支持24个字符');
                            _this.label.eq(1).css('color', '#e02f2f');
                        } else {
                            _this.label.eq(1).html('密码应为字母、数字或半角符号的组合');
                            _this.label.eq(1).css('color', '#e02f2f');
                        }
                    }
                } else {
                    _this.label.eq(1).html('请输入密码');
                    _this.label.eq(1).css('color', '#e02f2f');
                }
            });
            /* 验证密码 */
            this.input.eq(2).focus(function() {
                _this.label.eq(2).html('请再次输入您的密码');
                _this.label.eq(2).css('color', '#666');
            });

            this.input.eq(2).blur(function() {
                // console.log(_this.input.eq(0).val())
                if (_this.input.eq(2).val() != '') {
                    if (_this.input.eq(2).val() == _this.input.eq(1).val()) {
                        _this.em.eq(2).show();
                        _this.label.eq(2).html('');
                        _this.confirmswitch = true;

                    } else {
                        _this.em.eq(2).hide();
                        _this.label.eq(2).html('两次密码输入不一致');
                        _this.label.eq(2).css('color', '#e02f2f');
                    }
                } else {
                    _this.label.eq(2).html('确认密码不能为空');
                    _this.label.eq(2).css('color', '#e02f2f');
                }
            });
            /* 确认密码 */
        }
        down(ev) {
            this.sx = ev.offsetX;
            console.log(this.sx)
        }
        move(ev) {
            var l = ev.clientX - this.slide.offset().left - this.sx
                /*  console.log(ev.clientX)
                 console.log(this.slide.offset().left) */
                // console.log(l)
                // console.log(this.slide.width())
                // console.log(this.drag.width())
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
                this.em.eq(3).show();
                this.em.eq(3).css({
                    'right': '-27px',
                    "top": '3px',
                });
                this.dragswitch = true;
            }
        }
        up() {
            $(document).off('mousemove');
            $(document).off('mouseup');
        }
        submitInformation() {
            let _this = this;
            // console.log(this.input.eq(0).val())
            if (this.checkbox.get(0).checked) {
                if (this.telswitch == true && this.passwordswitch == true && this.confirmswitch == true && this.dragswitch == true) {
                    $.ajax({
                        url: "http://10.31.164.55/zhebabai/php/register.php",
                        type: "POST",
                        data: {
                            usertel: _this.input.eq(0).val(),
                            password: _this.input.eq(1).val(),
                        },
                        success: function(data) {
                            console.log(data)
                            if (data == 'true') {
                                window.location.href = 'login.html';
                            } else {
                                _this.label.eq(0).html('用户名已存在，<a href="login.html">去登录</a>');
                                _this.label.eq(0).css('color', '#e02f2f');
                            }
                        }
                    })
                } else {
                    alert('请完成注册')
                }
            } else if (this.telswitch != true || this.passwordswitch != true || this.confirmswitch != true || this.dragswitch == true) {
                alert('请完成注册')
            }
        }
    }
    new formValidation().init()
})();
/* 表单验证 */
;
(function() {
    class moreLogin {
        constructor() {
            this.showMore = $('#main .form_right .third_party_login .showmore');
            this.showMoreul = $('#main .form_right .third_party_login ul');
        }
        init() {
            let _this = this;
            this.showMore.on('click', function() {
                _this.show()
            })
        }
        show() {
            let _this = this;
            if (this.showMoreul.height() <= 45) {
                this.showMoreul.height(this.showMoreul.find('li').height() * 2);
            } else {
                this.showMoreul.height(45);
            }
        }
    }
    new moreLogin().init()
})();
/* 点击更多*/