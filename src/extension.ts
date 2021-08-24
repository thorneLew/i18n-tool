// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import I18n from './i18n';
import {I18nContent} from './I18nContent';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	const i18nContent = new I18nContent();

	I18n.init(context, function () {
		// i18nContent.start();
	});

	// 保存文件事件
	const saveFileEvent = vscode.workspace.onDidSaveTextDocument((document) => {
		// i18nContent.start();
	});
	
	// 打开文件事件
	const openFileEvent = vscode.workspace.onDidOpenTextDocument((document) => {
		i18nContent.start();	
	});

	// // 关闭文件事件
	// const closeFileEvent = vscode.workspace.onDidCloseTextDocument((document) => i18nContent.start(document));

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('i18n-tools.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from i18n-tools Vscode!');
	});
	vscode.window.showInformationMessage("I18N init Success");

	// 目前感觉是： 注册事件
	context.subscriptions.push(disposable);
	context.subscriptions.push(saveFileEvent);
	context.subscriptions.push(openFileEvent);
	// context.subscriptions.push(closeFileEvent);
}

// this method is called when your extension is deactivated
export function deactivate() {}
