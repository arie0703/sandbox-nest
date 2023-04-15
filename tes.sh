DATABASE_ID=7e994bc4418c4ac497b768a3e7ca8aa4
SECRET=secret_Vqx8HoKicvPm9gekVjyTchhd5ZKAQ8w256tTppAhMso

curl -X POST 'https://api.notion.com/v1/pages' \
-H 'Authorization: Bearer secret_Vqx8HoKicvPm9gekVjyTchhd5ZKAQ8w256tTppAhMso' \
-H 'Content-Type: application/json' \
-H 'Notion-Version: 2022-06-28' \
--data '{
  "parent": { "database_id": "7e994bc4418c4ac497b768a3e7ca8aa4" },
  "properties": {
    "title": {
      "title": [
        { "text": { "content": "アイテムのタイトル" } }
      ]
    },
    "期限": {
      "date": {
        "start": "2023-04-15"
      }
    }
  }
}'

# curl -X POST 'https://api.notion.com/v1/databases/7e994bc4418c4ac497b768a3e7ca8aa4/query' \
#   -H 'Authorization: Bearer secret_Vqx8HoKicvPm9gekVjyTchhd5ZKAQ8w256tTppAhMso' \
#   -H 'Content-Type: application/json' \
#   -H 'Notion-Version: 2022-06-28' | jq .
