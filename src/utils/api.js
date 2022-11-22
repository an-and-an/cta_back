import { ElMessage } from 'element-plus'
export function apiOver(callback, code, message, config = {}) {
  if (code === 0) {
    callback()
    ElMessage( { type:'success', ...config , message } )
  } else if(code === 1){
    ElMessage({ type: 'error', ...config, message })
  }else {
    ElMessage( { type:'warning',...config , message } )
  }
}