<template>
  <el-button @click="drawerRef!.openCreateDrawer()" type="primary">新增角色</el-button>
  <div class="list">
    <list
      :list="rolesList"
      :select="select"
      :is-page="false"
    >
      <el-table-column fixed="right" label="操作" width="400px" align="center">
        <template #default="scope">
          <el-button
            @click="drawerRef!.openUpdateRouterDrawer(scope.row)"
            text
            type="primary"
            icon="Edit"
          >
            查看/修改路由
          </el-button>
          <el-button
            @click="drawerRef?.openUpdateDrawer(scope.row)"
            text
            type="primary"
            icon="Edit"
          >
            修改信息
          </el-button>
          <el-popconfirm v-if="scope.row.id > 31" title="确定删除？" @confirm="DelHandler(scope.row)">
            <template #reference>
              <el-button
                text
                type="danger"
                icon="Delete"
              >
                删除角色
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </list>
  </div>
  <drawer-cpm
    ref="drawerRef"
    :is_pc="true"
    @create="createEvent"
    @update="updateEvent"
    @get-tree-checked-list="getTreeCheckedList"
  />
</template>

<script lang="ts" setup>
// components
import List from '@/components/common/list/index.vue';
import drawerCpm from './childCpm/drawer.vue';
import { apiOver } from '@/utils/api.response';
const drawerRef = ref<InstanceType<typeof drawerCpm>>();
// 角色列表
const rolesList = ref([])
// 列字段
const select = ref([
  {
    label: 'id',
    prop: 'id',
    width: 80,
  },
  {
    label: '角色',
    prop: 'roleName',
    width: 120,
  },
  {
    label: '描述',
    prop: 'roleDescription',
    width: 130,
  }
])

// methods
// 获取角色列表
async function GetRolesList() {
  const res = await getAllRoles();
  // console.log(res);
  rolesList.value = res.data
}

async function updateEvent(updateRole: any) {
  const { code, message } = await updateRoleInfo(updateRole)
  apiOver(async () => {
    await GetRolesList()
    drawerRef.value!.closeUpdateDrawer();
  }, code, message)
}

async function DelHandler(scope: any) {
  const { code, message } = await deleteRoleApi(scope.id)
  apiOver(() => GetRolesList(), code, message)
}

async function createEvent(createRoleDto: any) {
  const { code, message } = await addRoleApi(createRoleDto);
  apiOver(() => {
    drawerRef.value!.closeCreateDrawer();
    GetRolesList();
  }, code, message)
}

async function getTreeCheckedList(id: number, routers: any) {
  const { code, message } = await setRoleRouters({ id, routers });
  apiOver(() => drawerRef.value!.closeUpdateRouterDrawer(), code, message)
}

GetRolesList()

</script>

<style scoped>
.list {
  width: 730px;
  min-width: 600px;
}
@media screen and (max-width: 1000px) {
  .list {
    width: 100%;
  }
}
</style>
