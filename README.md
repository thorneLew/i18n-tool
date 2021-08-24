

## TODO
```json settings.json 配置
	"i18n-tools.sourceLanguage": "public/translations.translations-zh",
	"i18n-tools.regText": {
		"pattern": "t\\('(.+)'\\)",
		"modifiers": "g"
	}
```
* 建议：自己先拿正则自己去匹配一下
eg: 
```
	/t\(('.*?')\)/g

	DeFi ${t('Information')},DeFi ${t('detail')},${t('nav.projects')},${t('keywords')}`,
```
* "i18n-tools.regText"： 一定要配置对 

