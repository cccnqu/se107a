## 隨堂練習 -- 雙人合作初體驗 (pull request 一人分飾兩角)

請延續 《上一個練習》，將你的套件出版在 github 上

0. 在 github 中創造一個 organization
  * https://github.com/settings/organizations
1. 在該 organization 上為你的套件開一個專案
  * 參考 ： https://github.com/se107a/ccclodash
2. 將該專案 fork 到自己的身分帳號下 (非 organization)
  * 主導者: https://github.com/se107a/ccclodash
  * 貢獻者: https://github.com/ccckmit/ccclodash
3. 貢獻者分支專案，例如叫 develop1 
4. 稍微修改一下 develop1 分支的內容 (可以修改 README.md 文件就好)，然後發送 pull request 給主導者
5. 主導者透過下列指令下載貢獻者的提交版本
  * git remote add 來源名稱(例如 ccckmit) 來源專案網址(例如 https://github.com/ccckmit/ccclodash)
  * git fetch 來源名稱(例如 ccckmit)
6. 主導者用 marge 合併該版本並測試是否正常
  * git checkout -b 測試分支名稱(例如 ccckmit-develop1)     // 這個動作會從 master 分支出 ccckmit-develop1
  * git merge -b ccckmit/develop1
  * 執行 mocha 指令測試
5. 測試沒問題後，回到主導者專案，去接收 pull request，核可該 pull request 。(這時該請求就被接受了)


完整參考: https://github.com/se107a/ccclodash