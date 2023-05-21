<?php
    (float)$value1 = $_GET["value1Plus"];
    (float)$value2 = $_GET["value2Plus"];

    (float)$value3 = $value1 + $value2;
    
    echo $value3;
    $value1 = null;
    $value2 = null;
?>