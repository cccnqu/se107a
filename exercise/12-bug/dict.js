const D = module.exports = {}

D.e2c = {
  a: '一',
  chase: '追',
  eat: '吃',
  the: '這',
  dog: '狗',
  cat: '貓'
}

D.rev = function (s2t) {
  let t2s = {}
  for (let s in s2t) {
    let t = s2t[s]
    t2s[t] = s
  }
  return t2s
}

D.c2e = D.rev(D.e2c)

console.log(D.c2e)