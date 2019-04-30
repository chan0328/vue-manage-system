import config from "../server/config";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
const quillEditorMixin = {
    data() {
        return {
            token:'',
            editorOption: {
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: "file",
                        size: 100,
                        action: config.uploadUrl,
                        response: res => {
                            return this.$qiniuUrl + res.hash;
                        },
                        change: (xhr, formData) => {
                            formData.append("token", this.token);
                        }
                    },
                    toolbar: {
                        container: container,
                        handlers: { 
                            image: function () {
                                QuillWatch.emit(this.quill.id);
                            }
                        }
                    }
                }
            }
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            //获取图片上传token
            this.$store.dispatch('banner/getToken').then(res=>{
                this.token=res.data.data;
            })
        }
    }
}
export default quillEditorMixin
