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
このプロジェクトにおいては、以下のコマンドでローカルサーバーが立ちあがあります。

### `npm start` or `yarn start`

開かない場合は [Open](http://localhost:3000) をクリックしてください。

## <a id="搭載機能">搭載機能</a>

1. タスクを期日順に一覧表示する機能
2. タスクを追加する機能
3. タスクを完了する機能
4. タスクを全て/未完了/完了でフィルタリングする機能
5. タスク追加時に期日を設定する機能
6. タスクの名前と期日を編集する機能
7. タスクを削除する機能

## <a id="搭載機能作成理由">搭載機能作成理由</a>

### ① 期日機能を実装した理由

3 つの理由があります。

<pre>
1つ目が、「いつまでにやるべきタスクなのか」というゴール設定がなかったら実用性に欠けてしまうから。
2つ目が、タスクを一覧表示した時に、日付ごとに分かれていたら"するべき"タスクの多さに落胆しない気がしたから。
3つ目が、期日があれば通知機能や補足①で述べる本当に作りたかった機能など、拡張がしやすいと思ったから。
</pre>

です。

### ②CRUD を実装した理由

<pre>
自分自身が編集モード昨日(編集・削除)がないTodoアプリは使いたくないと思ったし、ユーザーにも使ってもらいたくないから。
</pre>

です。

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
