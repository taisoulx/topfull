<template>
    <div>
        <h3>课程列表</h3>
        <hr>
        <div>
            <el-button class="addCourse" size='small' type="success" @click="$router.push('/courses/create')">创建课程</el-button>
            
        </div>
        <el-table :data="data.data" border stripe>
            <el-table-column v-for="(field, name) in fields"
                :prop="name"
                :key="name"
                :label="field.label"
                :width="field.width">
            </el-table-column>
            <el-table-column
                    label="操作"
                    :width="200">
                    <template v-slot="scope">
                            <el-button 
                            size="small" 
                            type="success" 
                            @click="$router.push(`/courses/edit/${scope.row._id}`)">
                            编辑
                            </el-button>

                            <el-button 
                            size="small" 
                            type="danger" 
                            @click="remove(scope.row._id)">
                            删除
                            </el-button>
                            
                    </template>
                </el-table-column>

        </el-table>
        
    </div>
</template>

<script lang='ts'>
import { Vue,Component } from 'vue-property-decorator' 

@Component({})
export default class CourseList extends Vue {
    
    data = {}
    fields = {
        _id:{label:'ID'},
        courseName:{label:'课程名称'},
        cover:{label:'课程封面图'}
    }

    async fetch(){
        const res  = await this.$http.get('courses')
        this.data = res.data
        console.log(this.data)
    }

    async remove(coureseId:string){
        try {
            await this.$confirm('是否确认删除')  
        } catch (error) {
            this.$message('取消') 
            return
        }
        await this.$http.delete(`courses/${coureseId}`)
        this.$message('删除成功')
        this.fetch()
    }

    created() {
        this.fetch()
    }
}
</script>

<style scoped>
.addCourse{
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>