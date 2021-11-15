import * as path from 'path';
import * as vscode from 'vscode';
import { env, workspace } from 'vscode';
import { getConfig } from './config';

export default class I18n {
  static language = env.language.toLocaleLowerCase();
  static messages: Record<string, string> = {};
  static fileJson: any;
  static data: any = {};

  static init(ctx: vscode.ExtensionContext, cb: () => void) {
	var workspaceFolders = workspace.workspaceFolders;
	workspaceFolders?.forEach(item => {
		I18n.readLocalesDir(item).then(() => {
			cb();
		});
	});
  }

  static async readLocalesDir (workspaceFolder: vscode.WorkspaceFolder) {
	const config = getConfig();

	const localPath = config.rootPath as string;
	const rootPath = workspaceFolder.uri.path;

	async function deep (filePath: string) {
		if (!I18n.data[filePath]) {
			I18n.data[filePath] = {}; 
		}
		
		const filePathUri = vscode.Uri.parse(path.join(rootPath, filePath));
		for (const [curName, fileType] of await workspace.fs.readDirectory(filePathUri) ) {
			const namePath = path.join(rootPath, filePath, curName);
			if (fileType === vscode.FileType.File) {
				 const fileBuffer = await workspace.fs.readFile(vscode.Uri.parse(namePath));
				 // 获取到文件内容
				 const dataString = fileBuffer.toString();
				 let fileJson = {};
				 dataString && (fileJson = JSON.parse(dataString));
				 // 当前文件名为key
				 const currNameKey = path.basename(curName, '.json');
				 
				 I18n.data[filePath][currNameKey] = fileJson; 
			} else if (fileType === vscode.FileType.Directory) {
				I18n.data[path.join(filePath, curName)] = {};
				await deep(path.join(filePath, curName));
			}
		};
	}
	try {
		await deep(localPath);	
	} catch (error) {
		console.log(error);
	}
	return I18n.data;
  }

}