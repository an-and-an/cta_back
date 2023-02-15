import * as XLSX from 'xlsx';
// import { getFilterArrayByTree } from './solveElementUI';
function sheet2blob(sheet: any, sheetName: any = 'sheet1') {
	var workbook: any = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts: any = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s: any) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

export function openDownloadDialog(url: any, saveName: any) {
	if(typeof url == 'object' && url instanceof Blob) {
		url = URL.createObjectURL(url); // 创建blob地址
	}
	var aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || '';
	var event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else {
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}
/**
 * 
 * @param arr 二维数组，第一行为列字段，后续为data
 * @param filename 导出的文件名
 */
export function downloadArrayToExcel(arr: any[], filename: any) {
  const sheel = XLSX.utils.aoa_to_sheet(arr)
  openDownloadDialog(sheet2blob(sheel), filename)
}

function getExcelHeader(data: any) {
  const headers: string[] = [];
  for (const key in data) headers.push(key);
  return headers;
}
function getExcelData(data: any) {
  const res: any[] = [];
	for (const key in data) {
		res.push(data[key]);
  }
  // for (const option of options) {
  //   if (option.children) {
  //     res.push(...getExcelData(data[option.value], option.children));
  //   } else res.push(data[option.value]);
  // }
  return res;
  // for (const v in data) {
  //   if (typeof data[v] === 'string' || typeof data[v] === 'number') res.push(data[v]);
  //   else res.push(...getExcelData(data[v], options));
  // }
  // return res;
}
/**
 * 
 * @param data 已经筛过字段了的对象数组
 * @param options 导出的选项
 * @param filename 文件名
 */
function downloadFilterObjectArrayToExcel(
  data: any[],
  filename: string
) {
  const res: any[] = [];
  const headers: string[] = getExcelHeader(data[0]);
  res.push(headers);
  for (const v of data) res.push(getExcelData(v));
  downloadArrayToExcel(res, filename);
}
/**
 * 直接将从网络请求得到的数组以及用户选择的tree选项传过来就可以直接下载了。
 * @param data 源数据
 * @param options 选项
 * @param filename 文件名
 */
export function downloadObjectArrayToExcel(
  data: any[],
  filename: string
) {
  // 然后将过滤过的对象数组给下一个函数进行处理
  downloadFilterObjectArrayToExcel(data, filename);
}