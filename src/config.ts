import { workspace } from "vscode";

export function getConfig() {
	const config = workspace.getConfiguration();
	const rootPath: string | undefined = config.get('i18n-tools.rootPath'); // 语言包路径
	const regText: {pattern: string, modifiers: string} | undefined = config.get('i18n-tools.regText'); // 正则
	const sourceLanguage: string | undefined = config.get('i18n-tools.sourceLanguage'); // 当前语言
	const color: string | undefined = config.get('i18n-tools.color') || '#d6a01d'; // 当前语言
  
	return {
		rootPath: rootPath,
		reg: new RegExp(regText?.pattern as string, regText?.modifiers as string),
		sourceLanguage,
		color
	};
}
export function get (source: object, path: string, defaultValue = undefined) {
	// 将数组格式的路径转化成dot格式的，再拆分成key数组
	// a[0].b -> a.0.b -> ['a', '0', 'b']
	const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
	let result = source;
	for (const p of paths) {
	  result = Object(result)[p]; // null 与 undefined 取属性会报错, 用Object包装一下
	}
	return result || defaultValue;
  }

