@ECHO OFF

IF /I "%1"=="Update"  (
CURL -H "Content-Type: application/json" -X PUT "http://localhost:3000/api/updateDoc" -d {\"collection\":\"test\",\"updatedTwice\":\"true\",\"_id\":\"eb13c689bc4f980c47224f927d02ba9b\",\"_rev\":\"4-fe8553467c1f24f321cf3342ece3f6df\"}
)

IF /I  "%1"=="get"  (
ECHO "Getting Document"
CURL -X GET "http://127.0.0.1:5984/lbb_dev/eb13c689bc4f980c47224f927d02ba9b/"
)


assoc path
dissoc
lens path
over
