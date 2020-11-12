/**
 * GIS辅助工具集
 * created by zj on 2018.9.6
 */

var HUtil = (function(){
	return {
		/**
		 * 设置cookie
		 * @param {String} name
		 * @param {String|Number|Boolean} value
		 */
		createCookie : function(name,value){
			$.cookie(name,value,{expires:365});
		},
		/**
		 * 读取cookie
		 * @param {String} name
		 */
		readCookie : function(name){
			return $.cookie(name);
		},
		/**
		 * 删除cookie
		 * @param {String} name
		 */
		deleteCookie : function(name){
			$.cookie(name, null);
		},
		/**
		 * 获取当前时间戳
		 * @return {Date} currentTimeStamp
		 */
		getCurrentTimeStamp : function(){
			var currentTimeStamp = new Date().getTime();
			return currentTimeStamp;
		},
		/**
		 * 日期字符串转时间戳 2018-9-26 10:20:01
		 * @param {String} timestr
		 * @return {Date} timeStamp 时间戳  1537928401000 ms
		 */
		strToDateforSecond : function(timestr){
			var tDate = new Date(timestr);
			var timeStamp = Date.parse(tDate);
			return timeStamp;
		},
		/**
		 * 时间戳转日期字符串
		 * @param {Date} timestamp 时间戳 ms
		 * @return {String} dateStr 2018-9-26 10:20:01
		 */
		dateToStrforSecond : function(timestamp){
			var date = new Date(timestamp);
			var yy = date.getFullYear();
			var mm = date.getMonth() + 1;
			var dd = date.getDate();
			var hh = date.getHours();
			var ii = date.getMinutes();
			var ss = date.getSeconds();
			var dateStr = yy + "-";
			if(mm < 10){
				dateStr += '0' + mm + "-";
			}else{
				dateStr += mm + "-";
			};
			if(dd < 10){
				dateStr += '0' + dd + " ";
			}else{
				dateStr += dd + " ";
			};
			if(hh < 10){
				dateStr += '0' + hh + ":";
			}else{
				dateStr += hh + ":";
			};
			if(ii < 10){
				dateStr += '0' + ii + ":";
			}else{
				dateStr += ii + ":";
			};
			if(ss < 10){
				dateStr += '0' + ss;
			}else{
				dateStr += ss;
			};
			return dateStr;
		},
		/**
		 * UTC日期字符串转时间戳 2019-06-17T07:15:53Z
		 * @param {String} timestr
		 * @return {Date} timeStamp
		 */
		UTCToDateforSecond : function(timestr){
		    //转化时间格式 2019-06-17 07:15:53
		    var T_pos = timestr.indexOf('T');
		    var Z_pos = timestr.indexOf('Z');
		    var year_month_day = timestr.substr(0,T_pos);
		    var hour_minute_second = timestr.substr(T_pos+1,Z_pos-T_pos-1);
		    var new_timestr = year_month_day + " "+ hour_minute_second;
		    //转化为时间戳(增加八小时)
		    var timeStamp = HUtil.strToDateforSecond(new_timestr) + 8*60*60*1000;
		    return timeStamp;
		}
	};
})()

