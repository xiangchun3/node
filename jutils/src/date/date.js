/*
 * author: cxc
 * description: 日期处理
 * time: 2015-10-8
 *
 */
define(function(require, exports, module) {
    function DateUtil(date){
        var datetime = date ? new Date(+date) : new Date();
        this.yyyy = datetime.getFullYear();
        this.MM   = datetime.getMonth()+1;
        this.dd   = datetime.getDate();
        this.hh   = datetime.getHours();
        this.mm   = datetime.getMinutes();
        this.ss   = datetime.getSeconds();
        this.D    = datetime.getDay();
    }
    DateUtil.prototype = {
        /**
         * 将日期格式化成指定的字符串
         * @param  {String} format 需要格式化的格式，例：yyyy-MM-dd hh:mm:ss
         * @return {String}        格式化结果
         */
        format: function(format){
            var _this = this,
                format = format || "yyyy-MM-dd";

            return format.replace(/y+|M+|d+|h+|m+|s+|D/g, function(v){
                return _this[v] > 9 ? _this[v] : "0"+_this[v];
            });
        }
    }
    $.extend($, {
        date: function(d){
            d = d || new Date();
            return new DateUtil(+d);
        },
        toDate: function(d){
            return $.date(d).format("yyyy-MM-dd");
        },
        toDatetime: function(d){

            if(!d){return '';}
            return $.date(d).format("yyyy-MM-dd hh:mm:ss");
        },
        totime: function(d){
            if(!d){return '';}
            return $.date(d).format("MM月dd日hh:mm");
        }
    });
});