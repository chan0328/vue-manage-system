import Vue from 'vue';
let loading;

export default {
	loading(){
		loading = Vue.prototype.$loading({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
	    })
	},
	endLoading(){
		loading.close();
	},
	verify(value,type){
		let val=String(value).replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
		if(type=='number'){
			return /^\d+(\.\d{1,2})?$/.test(val);//正整数和小数点后两位
		}
	},
	date(timestamp){
	    var now = new Date(timestamp);
	    var year=now.getFullYear();
	    var month=(now.getMonth()+1)>9?(now.getMonth()+1):'0'+(now.getMonth()+1);
	    var date=now.getDate()>9?now.getDate():'0'+now.getDate();
	    var hour=now.getHours()>9?now.getHours():'0'+now.getHours();
	    var minute=now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes();
	    var second=now.getSeconds()>9?now.getSeconds():'0'+now.getSeconds();
	    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
	}
};