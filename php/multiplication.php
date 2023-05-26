<?php
    $value1 = (float)$_GET["value1Multiplication"];
    $value2 = (float)$_GET["value2Multiplication"];

    if ($_GET["value1Multiplication"] == "undefined" || $_GET["value2Multiplication"] == "undefined")  {
        echo "Error";
    } else {
        (float)$value3 = $value1 * $value2;
        
        echo $value3;
        $value1 = null;
        $value2 = null;
    }
?>