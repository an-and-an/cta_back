<template>
  <div>
    <el-table :data="tableData " style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="author.username" label="发布用户" width="150px" />
      <el-table-column prop="title" label="标题" width="200px" :show-overflow-tooltip="true" />
      <el-table-column prop="content" label="内容" width="350px" :show-overflow-tooltip="true" />
      <el-table-column prop="isApprove" label="状态" width="120px" />
      <el-table-column prop="" label="查看" width="80px">
        <template #default="scope">
          <el-button size="small" @click="check(scope.row.id)" type="primary">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="修改" width="80px">
        <template #default="scope">
          <el-button size="small" @click="modify(scope.row.id)" type="primary">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="props.currentRoleId==21 || props.currentRoleId==22" prop="" label="取消公示" width="80px">
        <template #default="scope">
          <el-button size="small" @click="cancelDisplay(scope.row.id)" type="primary"> 打回</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="props.currentRoleId==21 || props.currentRoleId==22" prop="" label="审核" width="200px">
        <template #default="scope">
          <el-button-group class="ml-4" size="small">
            <el-button type="primary" @click="audit(scope.row.id,true)">
              <el-icon>
                <Check />
              </el-icon>
            </el-button>
            <el-button type="primary" @click="audit(scope.row.id,false)">
              <el-icon>
                <Close />
              </el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShowAudit" style="width:300px;" :center="true" :show-close="false">
      <p v-if="auditRes">确认通过?</p>
      <p v-else>
        <el-input v-model="refusal" placeholder="请输入拒绝公示该新闻的理由" type="textarea" clearable />
      </p>
      <template #footer>
        <el-button type="primary" size="small" @click="offAudit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(['tableData', 'currentRoleId'])
const emit = defineEmits(['checkNews', 'modifyNews', 'cancelNews', 'auditNews'])
//查看新闻
const check = (id) => {
  // console.log('id---',props.currentRoleId);
  emit('checkNews', id)
}
// 修改新闻
const modify = (id) => {
  emit('modifyNews', id)
}
//打回，取消公示
const cancelDisplay = (id) => {
  emit('cancelNews', id)
}
//审核
const auditId = ref
const auditRes = ref()
const refusal = ref('')
const isShowAudit = ref(false)
const audit = (id, res) => {
  auditId.value = id
  auditRes.value = res
  isShowAudit.value = true
}
const offAudit = () => {
  emit('auditNews', auditId.value, auditRes.value, refusal.value)
  isShowAudit.value = false
}

const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  if (row.isApprove) return 'success-row'
  else if (row.reasonsForRefusal) return 'warning-row'
  return ''
}
</script>
<style scoped>
.el-table>>>.warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table>>>.success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>