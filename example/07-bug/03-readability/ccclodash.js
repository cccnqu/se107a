const _ = module.exports = {}

// 好的排版
_.chunk = function (list, n) {
  const clist = []
  for (let i = 0; i < list.length; i += n) {
    clist.push(list.slice(i, i + n))
  }
  return clist
}

// 糟糕排版 1 -- 沒縮排
_.compact = function (list) {
const clist = []
for (let o of list) {
if (o) clist.push(o)
}
return clist
}

// 糟糕排版 2 -- 亂縮排
_.concat = function () {
  const clist = arguments[0].slice(0)
    for (let i=1; i<arguments.length; i++) {
         clist.push(arguments[i])
           }
             return clist
       }
