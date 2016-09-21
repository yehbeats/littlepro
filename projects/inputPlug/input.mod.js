/**
 * Created by i-zhangshuai on 2016/9/21.
 */
;(function (window, undefined) {

    var $ = window.jQuery;
    function InputMod(options) {
        this.input_panel_sel = ''; //可以具体到某个input输入框，也可以是input的父selector
        this.input_dis_box = '';  //显示用户输入的selector
        this.prefix_zero = false;

        this._init(options);
    }

    InputMod.prototype = {
        constructor: InputMod,

        _init: function (options) {
            options = options || {};
            $.extend(this, options);
            this._bindEvn();
        },

        _bindEvn: function () {

            var that = this;

            var keyCodeCheck = function (keyCode, value) {
                var codes = [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 229];
                if(codes.indexOf(keyCode) !== -1) {
                    return true;
                }
                return false;
            };

            $(this.input_panel_sel).on('keydown', 'input', function (e) {
                return keyCodeCheck(e.keyCode);
            }).on('keyup', 'input', function (e) {
                var $self = $(this);
                var val = $self.val();
                if(/^[^\d]+$]/g.test(val)) {
                    $self.val([].concat(val.match(/\d+/g))[0]).focus();
                }
                val = $self.val();
                var max = $self.attr('max') * 1;
                var min = $self.attr('min') * 1;
                if(val - max > 0) {
                    val = Math.min(max, val);
                    $self.val(val).focus();
                }

                $self.data('code', $self.val() * 1 || min);
            }).on('blur focusout', 'input', function (e) {
                var $self = $(this);
                var min = $self.attr('min') * 1;
                var max = $self.attr('max') * 1;
                var now = $self.val() * 1;
                var val = $self.data('code') * 1 || min;

                if(now !== val && now >= min) {
                    val = now;
                }

                if(that.prefix_zero) {
                    var totalLen = (max + '').split('').length;
                    var valLen = (val + '').split('').length;

                    for(var i = valLen; i < totalLen; i++){
                        val = '0' + val;
                    }
                }

                var tag = $(that.input_dis_box)[0].tagName.toLowerCase();
                if(tag === 'input') {
                    $(that.input_dis_box).val(val);
                }else {
                    $(that.input_dis_box).text(val);
                }
            })

        }
    };

    window.inputMod = InputMod;

})(window);