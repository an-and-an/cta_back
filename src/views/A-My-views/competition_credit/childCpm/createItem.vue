<template>
  <el-dialog v-model="isShowSet" width="40%" style="min-width: 400px">
    <template #footer>
      <el-button
        @click="() => emit('createItem', setData)"
        type="primary"
        size="small"
        >确认</el-button
      >
    </template>
    <el-form label-width="100px" :rules="rules" :model="setData">
      <el-form-item label="比赛名称 " prop="compititionName">
        <el-input
          v-model="setData.compititionName"
          placeholder="请输入比赛名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="备注信息 " prop="description">
        <el-input
          v-model="setData.description"
          placeholder="请输入积分备注信息"
          clearable
        />
      </el-form-item>
      <el-form-item label="学号 " prop="studentId">
        <el-input
          v-model="setData.studentId"
          placeholder="请输入学号"
          clearable
        />
      </el-form-item>
      <el-form-item label="积分 " prop="integral">
        <el-input
          v-model="setData.integral"
          type="number"
          placeholder="请输入积分"
          clearable
        />
      </el-form-item>
      <el-form-item label="学期" prop="semester">
        <el-select v-model="setData.semester" placeholder="请选择学期">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组别">
        <el-select v-model="setData.group" placeholder="请选择组别">
          <el-option :value="false" label="B组" />
          <el-option :value="true" label="A组" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const isShowSet = ref(false);
defineProps<{
  options: any,
}>();
defineExpose({
  open: () => (isShowSet.value = true),
  close: () => (isShowSet.value = false),
});
const emit = defineEmits(["createItem"]);

const setData = reactive({
  semester: "",
  compititionName: "",
  integral: "",
  description: "",
  studentId: "",
  group: true,
});

const rules = ref({
  compititionName: [
    { required: true, message: "请输入比赛名称！", trigger: "blur" },
  ],
  description: [
    { required: true, message: "请输入积分备注！", trigger: "blur" },
  ],
  studentId: [
    { required: true, message: "请输入学号!", trigger: "blur" },
    { min: 11, max: 11, message: "请检查学号是否输入正确！", trigger: "blur" },
  ],
  integral: [{ required: true, message: "请输入积分!", trigger: "blur" }],
  semester: [{ required: true, message: "请选择学期！", trigger: "blur" }],
});

</script>

<style scoped></style>
