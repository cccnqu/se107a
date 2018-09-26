# 練習 -- jsdoc + docdash

* 參考: [jsdoc 中文文檔](http://www.css88.com/doc/jsdoc/index.html)


## 一 : 預設的 jsdoc 模板 

```
$ npm i --global jsdoc
$ jsdoc combine -r -d docs
```

## 二 : 使用 docdash

```
$ npm install docdash
npm WARN ccclodash@0.0.2 No repository field.

+ docdash@1.0.0
added 1 package in 23.117s
$ jsdoc combine -r -d docs -t node_modules/docdash
```

