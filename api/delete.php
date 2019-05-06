<?php
header("Access-Control-Allow-Origin: *");
include "connect.php";

$sql = "DELETE FROM task WHERE task.id = $_REQUEST[id]";
$res = mysqli_query($conn,$sql);
$conn->close();
if($res){
    echo "done";
}
else{
    echo "err";
}

?>