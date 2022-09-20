<script setup>
  import { GetTable } from '@/api/news'
  import { ref } from 'vue'
  const newsInfoList = ref([
      {
          newsTitle: "四川轻化工大学一学生一夜之间长高20cm",
          newsReleasePerson: "张三",
          newsReleaseTime: "2022-2-29",
      }
  ])
  GetTable({
      page: "1",
      pageSize: "10",
  }).then(res => {
      // console.log("res.list", res.list);
  })
//搜索
const searchValue = ref()
const searchNews = () => { 

}
  </script>
  <template>
      <div>
          <div>
              <el-button-group>
                  <el-button type="primary">
                      新闻
                  </el-button>
                  <el-button @click="$emit('showAddNews')" type="primary">
                      新建
                  </el-button>
              </el-button-group>
              <el-input v-model="searchValue"  @change="searchNews"  placeholder="搜索" style="width:50%;margin-left:50px" />
          </div>
          <div>
              <el-table :data="newsInfoList " style="width: 100%">
                  <el-table-column prop="newsTitle" label="标题" width="200px" />
                  <el-table-column prop="newsReleaseTime" label="发布时间" width="200px" />
                  <el-table-column prop="newsReleasePerson" label="发布用户" width="180px" />
                  <el-table-column prop="" label="操作" width="180px">
                      <template #default="scope">
                          <el-button size="small">查看 </el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
      </div>
  
  </template>
  <style>
  
  </style>