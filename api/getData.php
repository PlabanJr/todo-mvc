<?php
header("Access-Control-Allow-Origin: *");

include "connect.php";

$json_arr = array();

$sql = "SELECT * FROM task";
$result = mysqli_query($conn,$sql);

if($result){
    while($row = mysqli_fetch_assoc($result)){
        array_push($json_arr,$row);
    }   
    echo json_encode($json_arr);
}
else{
    echo json_encode(array("err" => 'err'));
}

$conn->close();

?>