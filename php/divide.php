<?php
    $value1 = (float)$_GET["value1Divide"];
    $value2 = (float)$_GET["value2Divide"];

    if ($_GET["value1Divide"] == "undefined" || $_GET["value2Divide"] == "undefined")  {
        echo "Error";
    } else {
        (float)$value3 = $value1 / $value2;
        
        echo $value3;
        $value1 = null;
        $value2 = null;
    }
?>