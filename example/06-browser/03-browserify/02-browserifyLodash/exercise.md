# 練習 -- publish


## 1 - 直接使用 browserify

```
$ browserify ccclodash.js -o dist/ccclodash.js
```

然後檢視 html/index.html

## 2 - 加入 npm script/dist


修改 package.json

加入 script/dist 段落

```json
{
  "name": "ccclodash",
  "version": "0.0.2",
  "description": "Reimplement some function of lodash",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "dist": "browserify ccclodash.js -o dist/ccclodash.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chai": "^4.1.2"
  }
}
```

改用下列指令建置網頁版

```
$ npm run dist

> ccclodash@0.0.2 dist D:\GoogleDrive\course\se107a\example\03-browserify\03-browserifyLodash2
> browserify ccclodash.js -o dist/ccclodash.js
```

然後檢視 html/index.html

