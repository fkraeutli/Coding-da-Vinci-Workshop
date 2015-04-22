<?php

header("Access-Control-Allow-Origin: *");

echo file_get_contents( "data/works_and_poets.csv" );

?>