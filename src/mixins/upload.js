import ImageCompressor from 'image-compressor.js';
const uploadMixin = {
    data() {
        return {
            coverImg:'',
            bannerImg:[],
        }
    },
    methods: {
        //图片上传
        upload(e,val){
            if(e.target.files[0].size>2*1024*1024){
                this.$message.warning('图片大小超出限制(2M)');
                return;
            }
            let file=e.target.files[0];
            if(file){
                let that = this;
                new ImageCompressor(file,{
                    quality: 0.8,
                    success(result) {
                        const formData = new FormData();
                        that.$store.dispatch('banner/getToken').then((res)=>{
                            formData.append('file', result, result.name);
                            formData.append('token', res.data.data);
                            that.$axios.post("https://up-z2.qiniup.com", formData).then((e) => {
                                if(val=='1'){
                                    that.coverImg = that.$qiniuUrl+e.data.hash;// 上传封面图
                                }else{
                                    that.bannerImg.push(that.$qiniuUrl+e.data.hash);// 上传轮播图
                                }
                            })
                        })
                    },
                    error(e) {
                        that.$message.warning('出错了，请稍后重试！');
                    }
                });
            }
        },
    },
}
export default uploadMixin 