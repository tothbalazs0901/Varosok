<?php

require './MySqlDB.php';

$mySql = new MySqlDB();

$varos = array();

$feltetel = " nev like \"" . $_GET["varos"] . "%\"";
//echo $feltetel;

$result = $mySql->lekerdez("varos", $feltetel);


if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {

        $varosok[] = $row;
    }
    echo json_encode($varosok);
} else {
    echo "0 results";
}
//print_r( $telefonkonyvem);

