import _ = require("lodash");
import { DecorationOptions, Range, TextDocument, TextEditor, window, workspace} from "vscode";
import { getConfig } from "./config";
import I18n from "./i18n";

const bigNumDecoration = window.createTextEditorDecorationType ({});

export class I18nContent {
	// 获取当前活动编辑器
	private editor: TextEditor | undefined;
	
	constructor(){}

	public start(){
		this.editor = window.activeTextEditor;
		const config = getConfig();
		// 这个判断条件的代码很重要，如果删除下面的代码会报错，请小伙伴们一定要做该判断
		if(!this.editor) { return; }
		// 获取当前文档的全部信息
		let doc = this.editor.document;
		// 获取文档中的全部内容
		let text = doc.getText();

		 // 创建两个用来存放正则判断出来的数字的数组
		 let bigNumbers: DecorationOptions[] = [];
		 
		 // 获取I18N 文案使用规则  
		 const regEx = 	config.reg;
		 let match;
		 while(match = regEx.exec(text)) {
		   // 获取数字开始和结束的位置
		   const startPos = doc.positionAt(match.index);
		   const endPos = doc.positionAt(match.index + match[0].length);
		   var a = I18n.data;
			// TODO: 此处先临时使用 sourceLanguage 配置完整路径 （会优化的）
		   const value = _.get(I18n.data, `${config.sourceLanguage}.${match[1]}`);
		   const lang = value || '暂时没有翻译';
		   // 在after内展示不同语言的文案
		   const decoration: DecorationOptions = {
			 range: new Range(startPos, endPos),
			 renderOptions: {
				after: {
					contentText: "   " + lang + "   ",
					color: "yellow",
				}
			 }	
		   };
	 
		   // 根据不同的长度分别存入不同的数组中
			bigNumbers.push(decoration);
		}
		bigNumbers.length && this.editor.setDecorations(bigNumDecoration, bigNumbers);
	}
}