<?php
header("Access-Control-Allow-Origin: *");
include "connect.php";
$id = $_REQUEST[id];
$caption = $_POST[caption];

$sql = "UPDATE task SET caption = '$caption' WHERE task.id = $id";
mysqli_query($conn,$sql);

$conn->close();
echo $caption;


?>