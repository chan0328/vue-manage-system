const  pageMixin = {
    data() {
        return {
            title:'',
            date:'',
            value:'',
            value2:'',
            value3:'7',
            beginTime:'',
            endTime:'',
            list: [],
            keyword:'',
            select:'1',
            currentPage: 1,
            dialogVisible:false
        }
    },
    created(){
        this.getList();
    },
    watch:{
        value(newVal,oldVal){
            this.currentPage=1;
            this.getList();
        },
        value2(newVal,oldVal){
            this.currentPage=1;
            this.getList();
        },
        value3(newVal,oldVal){
            this.currentPage=1;
            this.getList();
        },
        date(newVal,oldVal){
            this.currentPage=1;
            if(newVal){
                this.beginTime=newVal[0];
                this.endTime=newVal[1];
            }else{
                this.beginTime='';
                this.endTime='';
            }
            this.getList();
        }
    },
    methods: {
        search(){
            this.getList();
        },
        currentChange(page){
            this.currentPage=page;
            this.getList();
        }
    }
}
export default pageMixin
  