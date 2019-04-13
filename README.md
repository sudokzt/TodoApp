# Todo アプリ

これは React を用いて作った Todo アプリです。

1. masterブランチではReact,Reduxで実装をしました。
2. attempt-react-hooksブランチでは ReactHooksで実装をしました。（Issuesに書いた警告機能に関してはhooksでは実装していません。）

## 目次

- [セットアップ方法](#セットアップ方法)
- [搭載機能](#搭載機能)
- [搭載機能作成理由](#搭載機能作成理由)
- [補足](#補足)

## <a id="セットアップ方法">セットアップ方法</a>

このアプリケーションにはボイラーとして [Create React App](https://github.com/facebook/create-react-app) を用いました。
このプロジェクトは、git cloneをした後で、以下のコマンドを入力することnode_modulesを配置してローカルサーバーが立ちあがあります。

### `npm install`	or `yarn install`
### `npm start` or `yarn start`

開かない場合は http://localhost:3000
（デフォルトのportは3000番,他のlocalhostを開いている場合は、URLをターミナルに書いてある番号に変えてください） をクリックしてください。

## <a id="搭載機能">搭載機能</a>

1. タスクを期日順に一覧表示する機能
2. タスクを追加する機能
3. タスクを完了する機能
4. タスクを全て/未完了/完了でフィルタリングする機能
5. タスク追加時に期日を設定する機能
6. タスクの名前と期日を編集する機能
7. タスクを削除する機能

## <a id="補足">補足</a>

### ①Tweet 機能

(本来やりたかったこと)
- Twitterログイン
- Twitter自動投稿(毎朝、毎晩)
**「概要」**
毎朝、その日が期限になっているタスクを投稿する。その晩に、朝投稿したツイートへのリプライとしてその日が期限になっていたタスクの状態を投稿する。

*TweeterのDeveloper認証をもらうのに時間がかかってしまうらしくできなかった。*

### ②ReactHooks について

masterブランチではReact,Reduxで実装をしました。<br>
attempt-react-hooksブランチでは ReactHooksで実装をしました。<br>
まだまだ、Redux と ReactHooks における経験が少ないのでしっかりと勉強をします！<br>

localStorageを使って、タスクの状態を保存するようにしました。誤動作はないと思いますが、あった場合、localStorage.clear(); をブラウザにて打っていただけたらありがたいです！
