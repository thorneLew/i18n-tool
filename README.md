
# 辅助国际化开发

> 可自定义配置根目录，匹配规则，

## TODO

* 主要 匹配的 是key eg: (.+) 
* let value = get(I18n.data, `${config.sourceLanguage}.${match[1]}`) || ''

### 目录（案例）

└── locales
    ├── en
    │   ├── translation.json  只支持 json 一个文件
    ├── zh-CN
		├── translation.json

```json settings.json 配置
	"i18n-tools.rootPath": "locales", 							// 文案的目录
	"i18n-tools.sourceLanguage": "locales/zh-CN.translation", 	// 当前文案的数据
	"i18n-tools.regText": {			  							// 匹配使用文案的正则规则
		"pattern": "t\\('(.+)'\\)",
		"modifiers": "g"
	}
```
### 数据仓库的结构

TODO: 
	目前只支持一层文件夹和一层文件 不支持多层 请注意～ （后续有时间再来优化）
	根目录/目录: 空对象
	文件名：文件内容
```json

{
	"locales/en": {
		"translation": {} // json 内容	
	},
	"localeszh-CN": {
		"translation": {} // json 内容	
	}
}

```

* 建议：自己先拿正则自己去匹配一下
eg: 
```
	/t\(('.*?')\)/g

	DeFi ${t('Information')},DeFi ${t('detail')},${t('nav.projects')},${t('keywords')}`,
```
* "i18n-tools.regText"： 一定要配置对 


