import { workspace } from "vscode";

export function getConfig() {
	const config = workspace.getConfiguration();
	const rootPath: string | undefined = config.get('i18n-tools.rootPath'); // 语言包路径
	const regText: {pattern: string, modifiers: string} | undefined = config.get('i18n-tools.regText'); // 正则
	const sourceLanguage: string | undefined = config.get('i18n-tools.sourceLanguage'); // 当前语言
  
	return {
		rootPath: rootPath,
		reg: new RegExp(regText?.pattern as string, regText?.modifiers as string),
		sourceLanguage
	};
}