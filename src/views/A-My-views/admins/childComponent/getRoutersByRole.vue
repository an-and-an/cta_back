<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { getAllRoles } from '@/api/getRouter'
import { getRouterByRole, setRoleRouters } from '@/api/setRoleRouters'
import { router, asyncRoutes } from '@/router'
import { ElTree } from 'element-plus'
// import { defaultProps } from 'element-plus/lib/el-popper';
async function getRoute() {
    const res = await getAllRoles()
    return res.data;
}
const adminList = ref([])
getRoute().then(res => {
    adminList.value.push(...res)
})
const showRouter = ref(
    (function _1(routers: any) {
        const res = []
        routers.forEach((item: any) => {
            const { name, meta, children } = item;
            let router = {
                name, title: meta.title, children: []
            }
            if (children && children.length > 0) {
                router.children = _1(children)
            }
            res.push(router)
        })
        return res;
    })(asyncRoutes)
);

const isShow = ref(false)
const treeRef = ref<typeof ElTree>()
const currtRole = ref('')
const getRouter = (routers: any[], allRouters: any[]) => {
    const res = []
    allRouters.forEach((i) => {
        if (routers.some((j) => i.children.find((k: { name: any; }) => k.name === j.name))) {
            let _r = {
                name: i.name,
                title: i.title,
                children: []
            }
            if (i.children && i.children.length > 0) _r.children = getRouter(routers, i.children)
            else delete _r.children
            res.push(_r)
        } else routers.forEach((item) => {
            if (item.name === i.name) {
                let _r = {
                    name: i.name,
                    title: i.title,
                    children: []
                }
                res.push(_r)
            }
        })
    })
    return res
}

const btnClick = () => {
    isShow.value = false
    //返回当前选中节点的子节点   包含半选中节点的数据
    const _r = treeRef.value.getCheckedNodes(true, false)
    const _data = {
        roleName: currtRole.value,
        routers: []
    }
    const res = getRouter(_r, showRouter.value)
    _data.routers = res
    setRoleRouters(_data)
}
const showClick = (roleName: string) => {
    // 首先获取role对应的routers
    getRouterByRole(roleName).then(res => {
        // 然后将组件拉起来，（create）
        isShow.value = true
        // 记录当前的role
        currtRole.value = roleName
        // 此时如果直接设置默认选中节点的话，会导致前面的组件还没有create
        // 我们应该在他渲染出来之后在设置默认节点
        nextTick(() => {
            treeRef.value.setCheckedKeys(res.data.map((item: any) => item.name))
        })
    })
}

const props = {
    label: 'title',
    children: 'children',
}
</script>
        
<template>
    <div class="getRoutes">
        <el-table :data="adminList" style="width: 100%">
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleDescription" label="角色描述"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120" prop="roleName">
                <template #default="scope">
                    <el-button @click="showClick(scope.row.roleName)" size="small" type="primary">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="isShow" :modal="true">
            <div>
                <el-tree ref="treeRef" :props="props" :data="showRouter" show-checkbox node-key="name" />
            </div>
            <template #footer>
                <el-button @click="btnClick">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
    
<style>

</style>
    