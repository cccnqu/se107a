# 練習 -- instanbul

* 參考: https://istanbul.js.org/docs/tutorials/mocha/

Coverage Test


```
$ npm install --save-dev nyc
npm WARN ccclodash@0.0.2 No repository field.

+ nyc@13.0.1
added 183 packages in 136.118s
$ npm run cover

> ccclodash@0.0.2 cover D:\GoogleDrive\course\se107a\example\01-basic\04-istanbul
> nyc mocha



  ccclodash
    chunk
      √ _.chunk(['a', 'b', 'c', 'd'], 2) equalTo [ [ 'a', 'b' ], [ 'c', 'd' ] ]
      √ _.chunk(['a', 'b', 'c', 'd'], 3) equalTo [ [ 'a', 'b', 'c' ], [ 'd' ] ]
      √ _.chunk(['a', 'b', 'c', 'd'], 3) notEqualTo [ [ 'a', 'b'], ['c' , 'd' ] ]

  ccclodash
    compact
      √ _.compact([0, 1, false, 2, '', 3]) equalTo [ 1, 2, 3 ]

  ccclodash
    concat
      √ _.concat(array, 2, [3], [[4]]) equalTo [1, 2, [3], [[4]]]
      √ _.concat(array, 2, [3], [[4]]) equalTo [ 1, 2, 3 ]


  6 passing (160ms)

-----------------|----------|----------|----------|----------|-------------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------|----------|----------|----------|----------|-------------------|
All files        |      100 |      100 |      100 |      100 |                   |
 04-istanbul     |      100 |      100 |      100 |      100 |                   |
  ccclodash.js   |      100 |      100 |      100 |      100 |                   |
 04-istanbul/lib |      100 |      100 |      100 |      100 |                   |
  chunk.js       |      100 |      100 |      100 |      100 |                   |
  compact.js     |      100 |      100 |      100 |      100 |                   |
  concat.js      |      100 |      100 |      100 |      100 |                   |
-----------------|----------|----------|----------|----------|-------------------|

```

