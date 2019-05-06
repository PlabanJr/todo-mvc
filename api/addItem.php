<?php
    header("Access-Control-Allow-Origin: *");
    
    include "connect.php";

    $sql = "INSERT INTO task (caption, is_completed) VALUES ('$_REQUEST[data]', '0')";
    $result = mysqli_query($conn,$sql);   
    

    if($result){
        $id = mysqli_insert_id($conn);
        echo json_encode(array("id" => "$id", "caption" => $_REQUEST[data], "is_completed" => '0'));
    }
    else{
        echo "Insertion failed!";
    }

    $conn->close();
    
?>