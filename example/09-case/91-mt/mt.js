const MT = require('./dict')

var wordRegex = /([\w']+)|([\u4E00-\u9FFF]+)|([\n\r\s]+)|([^\w\u4E00-\u9FFF]+)/gmi

var suffixList = [
  "=", "d==%cd", "s==%cs", "es==%ces", "ed==%ced", "ly==%cly", "al==%cal", 
  "er=e=%cer", "er==%cer", "'s==%c's", "ies=y=%cies", 
  "ion==%cion", "ion=e=%cion",
  "ing==%cing", "ing=e=%ceing", "est=e=%cest", "able==%cable" ]

MT.clex = function(text, c2e) {
  var array = [];
  for (var i=0; i<text.length; ) {
    for (var len=4; len>=1; len--) {
      var c = text.substr(i, len);
      var e = c2e[c];
      if (len === 1 || typeof e !== "undefined") {
        array.push(c);
        break;
      }
    }
    i=i+Math.max(1,len);
  }
  return array;
}

MT.emt = function(w) {
  for (var i=0; i<suffixList.length; i++) {
    var parts=suffixList[i].split("=");
    var tail = parts[0], newTail=parts[1], pattern=parts[2];
    if (w.endsWith(tail)) {
      var w0 = w.substr(0, w.length-tail.length)+newTail;
      var wt = MT.e2c[w0.toLowerCase()];
      if (typeof wt !== 'undefined') {
        if (typeof pattern !== 'undefined') {
          wt = pattern.replace('%c', wt);
        }
        return wt;
      }
    }
  }
  return w;
}

MT.lex = function(text, c2e) {
  var words=[], m;
  while (m = wordRegex.exec(text)) {
    var word = m[0];
    if (typeof m[4] !== 'undefined') {
      words.push(m[4]);
    } else if (typeof m[3] !== 'undefined') {
      words.push(m[3]);
    } else if (typeof m[2] !== 'undefined') {
      // words.push(m[2])
      
      var cwords = MT.clex(m[2], MT.c2e);
      cwords.forEach((c)=>words.push(c));
      
    } else {
      words.push(MT.emt(m[1]));
    }
  }
  return words;
}

MT.mt = function (s, s2t) {
  var t = [];
  for (i in s) {
    var sword = s[i].toLowerCase();
    if (sword === '__br__') 
      tword = '<br/>';
    else {
      var tword = s2t[sword];
      if (typeof tword === 'undefined')
        tword = sword;
    }
    t.push(tword);
  }
  return t;
}

MT.textMt = function (text, s2t) {
  let tokens = MT.lex(text, MT.c2e)
  console.log('tokens=', tokens)
  let mtTokens = MT.mt(tokens, s2t)
  console.log('mtTokens=', mtTokens)
  return mtTokens.join('')
} 

console.log(MT.textMt('a dog chase the cat', MT.e2c))
console.log(MT.textMt('the dog love a cat', MT.e2c))
console.log(MT.textMt('the dog love a cats', MT.e2c))

console.log(MT.textMt('這隻狗追一隻貓', MT.c2e))

console.log(MT.textMt('<div>這隻<b>狗</b>追一隻 cat</div>', MT.c2e))
