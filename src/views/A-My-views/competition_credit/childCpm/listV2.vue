<template>
  <div id="__el-table-v2-row__"></div>
</template>

<script lang="tsx" setup>
import { Column, ElTableV2, TableV2FixedDir, ElTag, ElPopover, ElButton  } from 'element-plus';
import { isShowComponent, ROLES_KEY } from '@/directive/roles';

const props = defineProps<{
  creditList: any[],
  flexRow: any[]
}>();
let width = document.body.clientWidth - 250;
let height = document.body.clientHeight - 180;

const emit = defineEmits(["DeleteItem", "EditItem"]);
const columns: Column<any>[] = [
  {
    key: 'idx',
    width: 50,
    title: '排名',
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({ rowIndex }) => <>{rowIndex + 1}</>,
    align: 'center',
  },
  {
    key: 'major',
    title: '专业',
    dataKey: 'major',
    width: 140,
    align: 'center',
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({ cellData: major }) => <>{major}</>,
  },
  {
    key: 'username',
    title: '姓名',
    dataKey: 'username',
    width: 80,
    align: 'center',
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({ cellData: username }) => <>{username}</>,
  },
  {
    key: '总分',
    title: '总分',
    dataKey: '总分',
    width: 60,
    align: 'center',
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({ cellData: score }) => <>{score}</>,
  },
];
const isShowEdit = isShowComponent(ROLES_KEY.UPDATE);
const isShowDel = isShowComponent(ROLES_KEY.DELETE);
defineExpose({
  init: (flexRow: any) => {
    columns.splice(4);
    flexRow.forEach((row: string) => {
      columns.push({
        key: row,
        title: row,
        dataKey: row,
        width: 80,
        align: 'center',
        cellRenderer: ({ cellData }) => {
          if (!cellData) return <span></span>;
          const slot = {
            default: () => {
              return (
                <>
                  <p>{cellData.description}</p>
                  {
                    isShowEdit ?
                      <ElButton
                        size="small"
                        type="primary"
                        onClick={() => emit('EditItem', cellData)}
                      >修改</ElButton> : ''
                  }
                  {
                    isShowDel ?
                      <ElButton
                        size="small"
                        type="danger"
                        onClick={() => emit('DeleteItem', cellData.id)}
                      >删除</ElButton> : ''
                  }
                </>
              )
            },
            reference: () => {
              if (cellData.integral >= 4)
                return <ElTag effect="dark" type="success">{cellData.integral}</ElTag>
              if (cellData.integral >= 3)
                return <ElTag effect="dark">{cellData.integral}</ElTag>
              if (cellData.integral >= 2)
                return <ElTag effect="dark" type="warning">{cellData.integral}</ElTag>
              return <ElTag effect="dark" type="info">{cellData.integral}</ElTag>
            }
          }
          return (
            <ElPopover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
              v-slots={slot}
            >
            </ElPopover>
          )
        }
      })
    })
    const app = createApp({
    render() {
      return (
        <ElTableV2
          width={width}
          height={height}
          columns={columns}
          data={props.creditList}
          fixed
        />
      )
    }
  });
  app.mount("#__el-table-v2-row__");
  }
})
</script>

<style scoped>

</style>
