<template>
    <div>
        <avue-crud 
        v-if="option.column"
        :data="data.data" 
        :page="page"
        :option="option" 
        @row-save="rowSave" 
        @row-update="rowUpdate" 
        @row-del="remove"
        @on-load="changePage"
        @sort-change="changeSort"
        ></avue-crud>
        <!-- <el-tag>当前弹出框表单中的数据{}</el-tag> -->
    </div>
</template>

<script lang='ts'>
import { Vue,Component,Prop } from 'vue-property-decorator' 

@Component({})
export default class ResourceList extends Vue {
    @Prop(String) resource!:string
    data:any = {}
    option:any={}
    page:any = {
        "total": 0,
        "currentPage": 1,
        "pageSize": 2,
        "pageSizes": [ 2, 5,10],
        "background": true

    }
    query:any = {
        // limit:0
    }
    // 获取data数据
    async fetch(){
        const res  = await this.$http.get(`${this.resource}`,{
            params:{
                query:this.query
            }
        })
        this.data = res.data
        console.log(this.data)
        this.page.total = res.data.total
        console.log(this.page.total)
    }
    // 获取配置
    async fetchOption(){
        const res = await this.$http.get(`${this.resource}/option`)
        this.option = res.data
    }

    created() {
        this.fetch()
        this.fetchOption()
    }
    //添加数据的方法
    async rowSave(form:any,done:any){
        await this.$http.post(`${this.resource}`,form)
        this.$message.success('创建成功');
        this.fetch()
        done();
      }
    //更新数据的方法
    async rowUpdate(form:any,index:any,done:any){
        const data = JSON.parse(JSON.stringify(form))
        delete data.$index
        await this.$http.put(`${this.resource}/${data._id}`,data)
        this.$message.success('更新成功');
        this.fetch()
        done();
      }
      // 删除数据的方法
     async remove(row:any){
        try {
            await this.$confirm('是否确认删除')  
        } catch (error) {
            this.$message('取消') 
            return
        }
        await this.$http.delete(`${this.resource}/${row._id}`)
        this.$message('删除成功')
        this.fetch()
      }
      //切换页码的方法
      async changePage(page:any){
          this.query.page = page.currentPage,
          this.query.limit = page.pageSize
          this.fetch()
      }
      //服务端排序方法
      async changeSort(params:any){
          console.log(params)
          if(!params.order){
              this.query.sort = null
          }else{
              this.query.sort = {
                  [params.prop] : params.order ==='ascending'? 1 : -1
              }
          }
          this.fetch()

      }
}
</script>

<style scoped>
.form{
    margin-top: 50px;
}
</style>