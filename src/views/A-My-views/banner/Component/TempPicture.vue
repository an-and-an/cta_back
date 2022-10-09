<template>
  <div class="basic_box" id="basic_box">
    <div>
      <el-upload v-model:file-list="fileList" action="https://yibindfxy.top:444/application/upload/file" multiple
        list-type="picture-card" :on-success="handleUpload" :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove" name="file[]">
        <el-icon>
          <Plus />
        </el-icon>
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <!-- 预览 -->
              <span class="el-upload-list__item-preview action_item" @click="handlePictureCardPreview(file)">
                <el-icon>
                  <zoom-in />
                </el-icon>
              </span>
              <!-- 上移 -->
              <span class="el-upload-list__item-delete action_item" @click="moveUp(file)">
                <el-icon>
                  <Top />
                </el-icon>
              </span>
              <span class="el-upload-list__item-delete action_item" @click="moveDown(file)">
                <el-icon>
                  <Bottom />
                </el-icon>
              </span>
              <span class="el-upload-list__item-delete action_item" @click="handleRemove(file)">
                <el-icon>
                  <Delete />
                </el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const props = defineProps(['fileList', 'lastGxa'])
const emit = defineEmits(['add', 'delete', 'move'])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//删除
const handleRemove = (res) => {
  emit('delete', res.id)
}
//上传
const imgInfo = ref({
  href: "",
  name: "",
  url: "",
  rank: -1
})
//添加
const handleUpload = (res, uploadFiles) => {
  if (res.code === 0) {
    imgInfo.value.href = res.data[0].Host + "/" + res.data[0].RelativePath
    imgInfo.value.url = res.data[0].Host + "/" + res.data[0].RelativePath
    imgInfo.value.name = uploadFiles.name
    emit('add', imgInfo.value)
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
      offset: 300,
      duration: 3000,
    })
  }
}
//预览
const handlePictureCardPreview = (a) => {
  dialogImageUrl.value = a.href
  dialogVisible.value = true
  console.log(dialogImageUrl.value);
}
//移动
const moveUp = (a) => {
  emit('move', a, true)
}
const moveDown = (a) => {
  emit('move', a, false)
}
</script>
<style scoped>
.basic_box {
  position: relative;
  width: 100%;
  height: 100%;
}

.basic_box>>>.action_item {
  margin: 7.5px;
}
</style>