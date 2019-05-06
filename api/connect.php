<?php

$server_name = "127.0.0.1";
$user_name = "root";
$password = "goldtree9";
$db_name = "todo";

try{
    $conn = new mysqli($server_name,$user_name,$password,$db_name);
}
catch (Exception $e){
    echo 'Message: ' .$e->getMessage();
}



if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}

?>