<template>
    <div>
        <h3>{{isNew?'创建':'编辑'}}课程</h3>
        <hr>
        <ele-form class="form"
        :form-data="data"
        :form-desc="fields"
        :request-fn='submit'
        >

        </ele-form>
        
    </div>
</template>

<script lang='ts'>
import { Vue,Component,Prop } from 'vue-property-decorator' 

@Component({})
export default class CourseEdit extends Vue {
    @Prop(String) id!:string

    data = {}
    fields = {
        courseName:{label:'课程名称',type:'input'},
        cover:{label:'课程封面图',type:'input'}
    }

    //get 表示isNew当作一个属性来用
    //计算属性的使用
    get isNew(){
        //this.id存在则是true,!取反则表示fasle==>存在id则返回false
        return !this.id
    }

    async submit(data:any){
        const url = this.isNew ? `courses`:`courses/${this.id}`
        const method = this.isNew ? 'post':'put'
        await this.$http[method](url,data)
        this.$message.success('保存成功')
        this.data= {}
        //返回上一页
        this.$router.go(-1)
    }

    async fetch(){
        const res  = await this.$http.get(`courses/${this.id}`)
        this.data = res.data
        console.log(this.data)
    }

    created() {
        !this.isNew && this.fetch()
    }
}
</script>

<style scoped>
.form{
    margin-top: 50px;
}
</style>