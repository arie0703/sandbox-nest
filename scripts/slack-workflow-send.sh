# slack-workflow sendToChannel

curl -X POST -H "Content-Type: application/json" \
-d "{\"content\":\"$1\", \"description\":\"$2\"}" \
http://localhost:3000/slack-workflow
