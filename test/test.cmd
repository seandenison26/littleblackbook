@ECHO OFF

IF /I "%1"=="Update"  (
CURL -H "Content-Type: application/json" -X PUT "http://localhost:3000/api/updateDoc" -d {\"collection\":\"test\",\"updatedTwice\":\"true\",\"_id\":\"eb13c689bc4f980c47224f927d02ba9b\",\"_rev\":\"6-e71a221fd32579660e6296061d9b3b83\"}
)

IF /I "%1"=="post"  (
CURL -H "Content-Type: application/json" -X POST "http://localhost:3000/api/createDoc/" -d {\"collection\":\"test\"}
)

IF /I  "%1"=="get"  (
ECHO "Getting Document"
CURL -X GET "http://127.0.0.1:5984/lbb_dev/eb13c689bc4f980c47224f927d02ba9b/"
)
