<?php
    $value1 = (float)$_GET["value1Divide1x"];
    $value2 = (float)$_GET["value2Divide1x"];

    if ($_GET["value1Divide1x"] == "undefined" || $_GET["value2Divide1x"] == "undefined")  {
        echo "Error";
    } else {
        (float)$value3 = $value1 / $value2;
        
        echo $value3;
        $value1 = null;
        $value2 = null;
    }
?>