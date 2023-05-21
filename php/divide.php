<?php
    (float)$value1 = $_GET["value1Divide"];
    (float)$value2 = $_GET["value2Divide"];

    (float)$value3 = $value1 / $value2;
    
    echo $value3;
    $value1 = null;
    $value2 = null;
?>