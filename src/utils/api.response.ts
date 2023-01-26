import { ElMessage } from "element-plus"

export function apiOver(callback: Function, status: number, message?: string) {
  if (status === 200 || status === 0) {
    ElMessage({ type: 'success', message })
    callback()
  } else {
    ElMessage({ type: 'warning', message })
  }
}