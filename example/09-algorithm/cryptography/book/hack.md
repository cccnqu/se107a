## 破解密碼

### 前言

在上一章中，我們介紹了 4 個簡單的加密方法，包含「凱撒密碼」、「維吉尼亞密碼」、「XOR 密碼」與
「搭配偽隨機數的 XOR 密碼」等四種，該文的網址如下：

現在、我們將繼續介紹如何破解這些簡單的加密方法。

### 凱撒密碼的破解

凱撒密碼很簡單的將字母移動 k 位，例如若將 abcde 移動 3 位，那麼將變成 defgh。當我們想要破解「凱撒密碼」時，一個
很簡單的想法就是，找出 k 的值，然後反向移回來，也就是移動 -k 位，就可以回到原來的明文。

而且、如果是對英文加密，那麼由於只有 26 個字母，因此 k 的範圍就限制在 0-25 之間，因為移動 26 位的話，就相當於沒有
移位 (k=0)。所以，我們只要將 26 種可能性都解出來，然後用人眼看看哪一種最有意義，應該就可以破解這個加密法了。

### 維吉尼亞密碼的破解

維吉尼亞密碼是將「凱撒密碼」的密鑰擴展成多個，因此其密鑰可以表示成 

> k1, k2, k3, ..., kn

對於英文文章而言，如果 n 夠大 (例如 10)，那麼採用列舉的方式就會變得很困難，因為 26 的10次方將會是個很大的數字。

但是、由於英文字母的頻率分布不均勻，像是 z 就很少出現，因此只要能取得大量的秘文，然後進行統計，而且知道各個字母原本的統計出現頻率，
就有可能透過「頻率分析」法猜測出這些密鑰。

甚至、如果進一步去分析像 of, is, are, this, that 這種常用詞彙的頻率，就更有可能去破解「維吉尼亞密碼」了。

而且、假如您攔截到一小段的明文 (超過 n 個字母)，那麼就能直接找出 k1, ...., kn 的全部密鑰了。舉例而言，假如有以下的明文，
被我們用 k1, k2, k3 = 3, 2, 5 編成密文如下所示：

```
明文：attackmiddleisland
密文：dvy...............
```

當我們知道前三個字母 dvy 的明文為 att 時，我們就可以透過以下的比對方式知道密鑰 k1, k2, k3 為 3, 2, 5 了。

```
k1 = 'd'-'a' = 3
k2 = 'v'-'t' = 2
k3 = 'y'-'t' = 5
```

### XOR 密碼的破解

同樣的，如果已經知道一小段密文與明文的對應關係，那麼也就能輕易的破解 XOR 加密法的密碼了，舉例而言，假如某個 XOR 加密法
採用 32 個 bit 的密鑰 k，如果我們知道了某段明文，例如：

```
P[1..n] ASCII 明文    : a        t        t        a        c        k        {sp}     a        t        {sp}     7        /        4
        明文16進位    : 61       74       74       61       63       6B       20       61       74       20       37       2F       34       
        明文二進位    : 01100001 01110100 01110100 01100001 01100011 01101011 00100000 01100001 01110100 00100000 00110111 00101111 00110100
S[1..n] XOR密文(2進位): 10000001 11001110 11010000 00110100 
K[1..4] 解出密鑰      : 11100000 10111010 10100100 01010101  ...............................................................
```

因此、只要知道 4 個 byte 的明文，就可以完全破解採用長度 32 bit 密鑰的 XOR 加密法了。

一但知道密鑰之後，我們只要利用密鑰與密文完整的做一次 XOR 運算，就可以將明文完全解出來了。

因為 P XOR K = S, 則 P = (P XOR K) XOR K = S XOR K ，這是 XOR 運算的基本特性啊！

看到這裡，一定有人會說，上述的破解法根本就是作弊，我們怎麼有辦法知道那一小段明文呢？

(筆者註：其實這種情況並不是特例，在第 1,2 次世界大戰時，交戰雙方常常都可以拿到對方的一些明文，例如攻陷了某個堡壘，或者用間諜 ....)

事實上、對於 XOR 這種簡單型的加密法而言，就算沒有拿到任何明文，也不會真的太難解。舉例而言，根據英文這個語言的特性，您會發現
有很多詞經常會出現，像是 (of, is, at, on, in, are, the, that, ....)，而且在特定的場合中，也會有一些常見的領域用詞，例如在戰爭中的 
attack, move, .... 等詞彙出現的頻率會較高，於是我們就可以先猜測哪些詞彙應該會在明文當中出現過。然後再假設這些詞彙就是明文，
進行解密，如果這些詞彙真的在明文中出現過，那麼就能夠正確的解出明文了。

舉例而言，假如我們攔截到以下的 XOR 密文 (其中的 {sp} 代表空白字元)，而且我們知道密鑰的長度為 32 bits。

> a t t a c k {sp} at {sp} 7 / 4

```
P[1..n] ASCII 明文    : a        t        t        a        c        k        {sp}     a        t        {sp}     7        /        4
        明文16進位    : 61       74       74       61       63       6B       20       61       74       20       37       2F       34       
        明文二進位    : 01100001 01110100 01110100 01100001 01100011 01101011 00100000 01100001 01110100 00100000 00110111 00101111 00110100
S[1..n] XOR密文(2進位): 10000001 11001110 11010000 00110100 10000001 11001110 11010000 00110100 10000001 11001110 11010000 00110100 10000001
K[1..4] 解出密鑰      : 11100000 10111010 10100100 01010101 11100010 10100101 11110000 01010101 11110101 11101110 11100111 00011011 10110101
```

假如我們取得的密文數量較多，我們就可以很有信心的認為 {sp}at{sp} 這種樣式在密文裏至少會出現一次以上，於是我們就可以用下列方式解密：

1. 用 S[i..i+3] 與 {sp}at{sp} 做 XOR，得到 k'
2. 用 k' 去解整個密文，得到 p'
3. 檢察看看 p' 是否為合理的明文，若是則輸出之。

以上過程對每個 i 都做一次，只要明文中曾經出現 {sp}at{sp} 這個樣式，程式就可以找出合理的明文輸出了。

那麼，甚麼叫做「合理的明文」呢？一個比較愚笨的方法是用人看，如果沒什麼亂碼而且看得出意義，應該就是正確答案了。

但是這樣看很浪費時間，我們可以讓程式自動幫我們看，只要用一些簡單的判斷規則就行了。

1. p' 大部分都是英文字母，而且 ASCII 碼都介於 32 到 126 之間的可列印字元。
2. p' 中的字詞大部分都在字典中出現過 (或者更簡單的用常用詞出現次數很多來判斷就行了)

只要符合上述兩個條件，我們就認為 p' 是合理的明文了。(其實很多時候只要符合條件 1 就行了。

為了更清楚的說明上述想法，我們直接撰寫了一個程式來進行 XOR 密碼的破解動作，以下是該程式的執行結果與原始碼：

![](xor_hack.png)

```
D:\Dropbox\CodeData\cryptography1>gcc xor_hack.c -o xor_hack

D:\Dropbox\CodeData\cryptography1>xor_hack
明文=Zero-hour is July/4th 3.30 am
密文=7ZW?u?B?E狘V?
i=00 score=15 key=17 33 77 ac  hackPlain= is Wdn,h<ZFt##5;,2aI<!.
i=01 score=19 key=60 7a 6d ff  hackPlain=W is -tiero-nptj/hee(2>u;}`
i=02 score=19 key=33 77 24 e5  hackPlain=- is =s,h;u~'j'gfr6ha(mxrg3
i=03 score=11 key=29 24 39 ac  hackPlain=~= is :6;&<dQ:#=4{;,;|aw+o.)
i=04 score=15 key=60 3e 6a b6  hackPlain=Wdn: is !u&-Ki9t.(!e!/{>1<4`
i=05 score=20 key=3f 77 70 e5  hackPlain-ti is hoursj+g2r:h5(ax&g?
i=06 score=19 key=6c 3f 39 ff  hackPlain=[e=s,h is &o!J:px/{hi |220o}l
i=07 score=16 key=76 6c 3f b6  hackPlain=A6;:6;& is &;<9b|}!ssz{(ci4v
i=08 score=13 key=3f 76 6c b0  hackPlain,h<!u& is ro?+f.':i)}ay:2?
i=09 score=26 key=6d 3f 76 e3  hackPlain=Zero-hour is July/4th 3.30 am
i=10 score=15 key=3e 55 3f f9  hackPlain=       ;u~&o!J is <v*E}n;Jz4`Zi{>
i=11 score=12 key=24 06 23 b0  hackPlain=\'<dQ:&;< is ?0a'!f}z      u2$
i=12 score=20 key=6d 1c 70 af  hackPlain=ZFt#-Ki9ro? is y28h5b3&-m
i=13 score=21 key=34 55 6a fc  hackPlain=nptsj+July is E(k1J/1jZ<~4
i=14 score=20 key=67 30 23 e6  hackPlain=Pj'j'g:px/<v*E is aqb/f+9?udg
i=15 score=17 key=7d 63 62 af  hackPlain=J9f#=4{9b|}?0a is 8x|'b#l4-}
i=16 score=19 key=34 79 31 b7  hackPlain=#5;t.(!+f.'y28 is 1ftzjvg54
i=17 score=18 key=25 30 2b e4  hackPlain=j/heg2r:/4thE(k1 is /n){?}f%
i=18 score=22 key=76 3f 62 fe  hackPlain=Aefr6h{hi }n;Jaqb/ is '3(04|v
i=19 score=18 key=6c 6c 65 b7  hackPlain=[6a;,;|!ssz'!f8x|' is z2c35l
i=20 score=17 key=25 76 36 ed  hackPlain=,2ae!/{:i)}h5b1ftz is {y`o%
i=21 score=19 key=7e 3f 2c be  hackPlain=Ie(2>h5(a 3.3J/1j/n){ is 0z<~
i=22 score=19 key=2d 2f 65 a4  hackPlain=ua(mx|220z4`Zf+9?'3(0 is 3&-
i=23 score=22 key=37 7c 76 ed  hackPlain=
i=24 score=17 key=7e 66 25 a2  hackPlain=I<!.>1<4ay:23&-jvg5{y`o is ~
還原=Zero-hour is July/4th 3.30 am
```

在上述結果中，您可以看到分數最高者為 i=09 的 26 分，對應的文字為「Zero-hour is July/4th 3.30 am」，也就是
真正的解答，其密鑰為 key=6d 3f 76 e3，因此我們就透過這樣的程式破解了這段文字，因為 {sp}is{sp} 這個樣式真
的在文章中出現了。

檔案：xor_hack.c

```CPP
#include <stdio.h>
#define BYTE unsigned char

int encrypt(char plain[], char cipher[], int len, char key[], int keyLen) {
  int pi;
  for (pi=0; pi<len; pi++) {
	  int ki = pi%keyLen;
      cipher[pi] = plain[pi] ^ key[ki];
  }
}

int decrypt(char cipher[], char plain[], int len, char key[], int keyLen) {
  int pi;
  for (pi=0; pi<len; pi++) {
	  int ki = pi%keyLen;
      plain[pi] = cipher[pi] ^ key[ki];
  }
  plain[pi] = '\0';
}

int getKey(char cipher[], int from, char pattern[], char key[], int keyLen) {
  int i;
  for (i=from; i<from+keyLen; i++) {
    int ki = i % keyLen;
    key[ki] = pattern[i-from] ^ cipher[i];
  }
}

int inSetCount(char str[], int len, char set[]) {
  int i, count=0;
  for (i=0; i<len; i++) {
    if (strchr(set, str[i]) > 0)
	  count++;
  }
  return count;
}

int printHex(char key[], int keyLen) {
  int i;
  for (i=0; i<keyLen; i++) {
    printf("%02x ", (BYTE) key[i]);
  }
}

char goodSet[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

int hack(char cipher[], int len, char pattern[], char hackKey[], int keyLen, char hackPlain[]) {
  int i;
  for (i=0; i<len-keyLen; i++) {
    getKey(cipher, i, pattern, hackKey, keyLen);
	decrypt(cipher, hackPlain, len, hackKey, keyLen);
	int score = inSetCount(hackPlain, len, goodSet);
    printf("i=%02d score=%02d key=", i, score);
	printHex(hackKey, keyLen);
	printf(" hackPlain=%s\n", hackPlain);
  }
}

int main() {
  char plain[] = "Zero-hour is July/4th 3.30 am";
  char cipher[100], plain2[100], hackPlain[100];
  int  len = strlen(plain);
  char key[] = { 0x6D, 0x3F, 0x76, 0xE3 };
  char hackKey[4];
  int  keyLen = 4;
  
  printf("明文=%s\n", plain);
  encrypt(plain, cipher, len, key, keyLen);
  printf("密文=%s\n", cipher);
  hack(cipher, len, " is ", hackKey, keyLen, hackPlain);  
  decrypt(cipher, plain2, len, key, keyLen);
  printf("還原=%s\n", plain2);
}
```

### 搭配偽隨機數的 XOR 密碼之破解

如果將 XOR 密碼的 key 改用偽隨機數產生，那要破解就更困難了一些，如果該偽隨機數的函數可以透過逆推而取得，
那麼就比較容易處理，但一般的偽隨機數函數通常是不容易逆推的，因此要破解的難度就提高了不少。

但是如果我們能夠猜測到整個字串的字首是甚麼字詞，那就能直接找到第一個 key，然後就能透過同樣的偽隨機數產生函數，
產生整個偽隨機數的 One-time pad，然後再用 One-time pad 與密文作 XOR 運算產生明文，這樣就能破解「搭配偽隨機數
的 XOR 加密法」了。

因此整個問題就變成了如何猜測出字首是甚麼字詞，或者當我們猜測出其中某個字詞後，就能推算出後面的偽隨機數，
因而破解後半部的 key，於是就可以用 XOR 的方法解出了後半部的明文。

所以我們同樣可以用類似上述的方法，只是盡可能用各種「在字首出現機率較大的字詞」，去比對出第一個 key，然後用這個
key 去產生後續的 key ，再用 XOR 法解得明文。

### 結語

如果您對密碼學的歷史有興趣的話，筆者覺得以下這本書寫得還蠻清楚有趣的，提供有興趣的讀者做進一步的參考。

* [古今密码学趣谈](http://book.douban.com/subject/20281462/), 作者: 王善平 , 电子工业出版社

當然、加解密技術博大精深，絕對不是筆者這兩篇文章可以涵蓋的。這兩篇文章的目的是引導「程式人」進入密碼學的領域，
用簡單的程式說明「加解密技術」的原理，然後同樣用程式說明破解密碼的原理，希望能讓讀者清楚的理解到「加密、解密、
與破解密碼」的過程與原理，以便做為進一步研究的基礎。

### 參考文獻
* 維基百科:[異或密碼]
* 維基百科:[密碼學]
* 維基百科:[凱撒密碼]
* 維基百科:[維吉尼亞密碼]
* Wikipedia:[Enigma]
* Wikipedia:[XOR_cipher]
* Wikipedia:[Vigenere Cipher]
* Wikipedia:[Vernam_cipher]
* Wikipedia:[One-time pad]


[密碼學]:http://zh.wikipedia.org/wiki/%E5%AF%86%E7%A2%BC%E5%AD%B8
[異或密碼]:http://zh.wikipedia.org/wiki/%E5%BC%82%E6%88%96%E5%AF%86%E7%A0%81
[維吉尼亞密碼]:http://zh.wikipedia.org/wiki/%E7%BB%B4%E5%90%89%E5%B0%BC%E4%BA%9A%E5%AF%86%E7%A0%81
[凱撒密碼]:http://zh.wikipedia.org/wiki/%E6%81%BA%E6%92%92%E5%AF%86%E7%A0%81
[Enigma]:http://en.wikipedia.org/wiki/Enigma_machine
[XOR_cipher]:http://en.wikipedia.org/wiki/XOR_cipher
[Vigenere Cipher]:http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
[Vernam_cipher]:http://en.wikipedia.org/wiki/Vernam_cipher
[One-time pad]:http://en.wikipedia.org/wiki/One-time_pad
