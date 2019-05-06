<?php
header("Access-Control-Allow-Origin: *");

include "connect.php";
$id = $_REQUEST[id];
$checked = $_REQUEST[checked];

$sql = "UPDATE task SET is_completed = $checked WHERE task.id = $id";

$result = mysqli_query($conn,$sql);

if($result){
    echo "done";
}
else{
    echo "err";
}
    
$conn->close();
?>