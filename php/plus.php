<?php

$value1 = (float)$_GET["value1Plus"];
$value2 = (float)$_GET["value2Plus"];

if ($_GET["value1Plus"] == "undefined" || $_GET["value2Plus"] == "undefined")  {
    echo "Error";
} else {
    (float)$value3 = $value1 + $value2;
    
    echo $value3;
    $value1 = null;
    $value2 = null;
}
?>