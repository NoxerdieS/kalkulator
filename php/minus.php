<?php
    $value1 = (float)$_GET["value1Minus"];
    $value2 = (float)$_GET["value2Minus"];

    if ($_GET["value1Minus"] == "undefined" || $_GET["value2Minus"] == "undefined")  {
        echo "Error";
    } else {
        (float)$value3 = $value1 - $value2;
        
        echo $value3;
        $value1 = null;
        $value2 = null;
    }
?>