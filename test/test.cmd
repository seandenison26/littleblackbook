@ECHO OFF

IF I/ %1=="Update"  (
ECHO "Updating"
REM CURL -H "Content-Type: application/json" -X PUT "http://localhost:3000/api/updateDoc" -d {\"collection\":\"test\",\"updatedTwice\":\"true\",\"_id\":\"eb13c689bc4f980c47224f927d02ba9b\",\"_rev\":\"2-b68700f6c39d8f4396a552bfaec29a6e\"}
)

IF I/ %1=="Get"  (
ECHO "Getting Document"
REM CURL -X GET "http://127.0.0.1:5984/lbb_dev/"
)

IF EXSIST %1 (
ECHO "Test Command Not Found"
)
