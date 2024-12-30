## 1. はじめに
- システム名： Live Chat
- 目的：組織単位でチームベースのリアルタイムチャットアプリケーションを開発する
- 開発環境：https://livechat.yukiasano-dev.com/

#### デモ
https://github.com/user-attachments/assets/c8b83551-cc63-4cbe-9cce-0320029661d7

## 2. システム構成図
![スクリーンショット 2024-12-19 23 45 21](https://github.com/user-attachments/assets/52246bc2-7ad5-4a1f-816a-031bd1ed111b)

## 3. 機能要件
#### 3.1 認証
- 方式： CognitoのJWTを利用した認証
- 入力項目：
  - チームコード
  - ユーザーID
  - パスワード
- 機能：
  - セキュアなログインプロセス
  - トークンの有効期限とリフレッシュ機能によるセッションのセキュリティ維持
  - パスワードの暗号化保存
#### 3.2 チーム管理
- 方式： Cognitoが保持するユーザー情報、DynamoDBによるログイン状態管理を連携
- 機能：
  - ユーザーが所属するすべてのチームを取得して表示
  - チームメンバーのログイン状態をリアルタイムで表示
#### 3.3 メッセージ機能
- 方式： WebSocket、Lambda、SQS、DynamoDBを連携
- 機能：
  - チーム内でリアルタイムにメッセージを送受信
  - テキストメッセージをサポートし、将来的にはマルチメディア（例: 画像、ファイル）対応も検討
  - 信頼性の高いメッセージ処理と配信のためにメッセージキューを使用
  - 接続切断時の自動再接続とメッセージ同期

## 4. 非機能要件
#### 4.1 HTTPS
- 方式： Route53、ACM、ALBの連携
  - HTTPSを実装し、セキュアなデータ通信

## 5. 技術仕様
- Next.js（App Router）
- SWR（WebSocket）
- Jotai
- Panda CSS
- Radix UI
- AWS（主要機能のみ抜粋）
  - EC2
  - Cognito
  - Lambda
  - DynamoDB
  - SQS
