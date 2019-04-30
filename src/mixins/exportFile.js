const FileSaver = require('file-saver');
const XLSX = require('xlsx');
const ROWS = 100;
const exportFileMixins = {
    methods: {
        handleExport(data,filename) {    
            var blob = new Blob([data], { type: "application/octet-stream" });
            FileSaver.saveAs(blob, `${filename}.xlsx`);
        },
        dataTransform(arrData,filename) {
            let wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(arrData); //必须是json 需要其他格式 https://docs.sheetjs.com/#writing-workbooks
            XLSX.utils.book_append_sheet(wb, ws);
            let wopts = { bookType: 'xlsx', type: 'array' };
            let wbout = XLSX.write(wb, wopts); //生成ArrayBuffer对象
            this.handleExport(wbout,filename);
        },
        recursion(api,index,params,loopNumber,filename,allData=[]) { // 并发接口请求
            let i = index + 1;
            api({ 
                page: i,
                size: 100,
                ...params
            }).then(res=>{
                if (res.data.code === 200) {
                    let data=res.data.data.list;
                    allData=this.handleExportData(data,allData);
                }
                if (i >= loopNumber) return this.dataTransform(allData,filename);
                this.recursion(api, i,params,loopNumber,filename,allData);
            }).catch(err=>{
                console.log(err,'timeout for the api'); // 接口超时 捕获错误
                i = i - 1;
                this.recursion(api,i,params,loopNumber,filename,allData);
            })
        },
        loadAllData(api,params,count,filename) {
            if (typeof api !== 'function') throw new Error('api must be a function');
            let loopNumber = 1; // 循环调用接口次数
            if (count > ROWS) {
                loopNumber = parseInt(count / ROWS);
                count % ROWS > 0 ? loopNumber++ : '';
            }
            filename=filename+this.timeNow();//定义xlsx文件名：名称+时间
            this.recursion(api,0,params,loopNumber,filename);
        },
        timeNow(){
            let now=new Date();
            let year=now.getFullYear();
            let month=(now.getMonth()+1)>9?(now.getMonth()+1):'0'+(now.getMonth()+1);
            let date=now.getDate()>9?now.getDate():'0'+now.getDate();
            let hour=now.getHours()>9?now.getHours():'0'+now.getHours();
            let minute=now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes();
            let second=now.getSeconds()>9?now.getSeconds():'0'+now.getSeconds();
            return year+""+month+""+date+""+hour+""+minute+""+second;
        }
    }
}
export default exportFileMixins