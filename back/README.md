# 概要
Spring Bootフレームワークで動作するTravel Plannerバックエンドプログラム

# 仕様
## DB関連
### 採用DBMS
MySQLを使用している（Javaプログラムであるため，JDBCドライバが必要）

### 接続情報（仮）
- host:localhost
- Database: traveltest
- User: root
- Pasword: rindatabase

## エンドポイント関係
### API
- `/api/members`
    - POST createMember ルートに含まれるメンバーIDを紐付け
    - RouteID, MemberID, UserIDを持つ
- `/api/routes`
    - POST createRoute ルートの名前とIDを紐付け（部屋のようなもの）
    - `/{id}`
        - getRouteDetails ルートIDでルートの詳細を検索
    - `/query`
        -  ??
- `/api/route-details`
    - POST addPlacetoRoute ルートに新たに場所を追加する（場所はRouteDetailで管理）
    - RouteDetailID, RouteID, PlaceID(GoogleMap), PlaceNameを持つ．
- `/api/users`
    - POST createUser ユーザーの新規作成
    - UserID, UserName, Address, TimesID(Times Car share)を持つ．
    - `/{id}`
        - GET getUserByID IDでユーザーの検索を行い，Userクラスの内容を返す