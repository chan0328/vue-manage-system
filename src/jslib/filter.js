import Vue from 'vue'
//图片
var rgExp = /^http:\/\/|^https:\/\//;

//图片过滤
Vue.filter('imgSelect',function(val){
	if(val==null){
		return ''
	}else{
		if (rgExp.test(val)){
			return imageUrl;
		}else{
			return process.env.IMG_RESOURE + val;
		}
	}
})

//时间年到秒
Vue.filter('dateYs',function(val){
	if(val==null){
		return ''
    }
    var now = new Date(val*1000)
    var year=now.getFullYear(); 
    var month=(now.getMonth()+1)>9?(now.getMonth()+1):'0'+(now.getMonth()+1); 
    var date=now.getDate()>9?now.getDate():'0'+now.getDate(); 
    var hour=now.getHours()>9?now.getHours():'0'+now.getHours(); 
    var minute=now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes(); 
    var second=now.getSeconds(); 
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
})

//距离发表多久
Vue.filter('dateAfter',function(val){
	if(val==null){
		return ''
    }
        var dateNow = new Date();
        var seconds_between = dateNow.getTime() - val * 1000;
        if ((seconds_between / (1000 * 60)) < 1) {
            // 小于1分钟
            return '1分钟前'
        } else if ((seconds_between / (1000 * 60 * 60)) < 1) {
            // 小于1小时
            return parseInt(seconds_between / (1000 * 60)) + '分钟前';
        } else if ((seconds_between / (1000 * 60 * 60 * 24)) < 1) {
            // 小于1天
            return parseInt(seconds_between / (1000 * 60 * 60)) + '小时前';
        } else if ((seconds_between / (1000 * 60 * 60 * 24)) < 7) {
            // 小于七天
            return parseInt(seconds_between / (1000 * 60 * 60 * 24)) + '天前';
        } else {
            var date = new Date(val * 1000);
            var y = date.getFullYear() + '-';
            var m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '-' : (date.getMonth() + 1) + '-';
            var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return y + m + d;
        }
})