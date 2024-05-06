<?php

require __DIR__.'/vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;

//echo __DIR__ ;

if( isset($_GET['cod']) ){

    $nombre = $_GET['nombre'];

    //echo $_GET['nombre'];

    $mysqli = new mysqli("localhost", "root", "", "saves-2711");

    $resultado = $mysqli->query("SELECT ci FROM persona WHERE nombre = ".$nombre." ");

    if ($resultado == false){
        var_dump($resultado);
    }

    $resultado = $resultado->fetch_row();

    /* print_r($resultado);

    echo $resultado[0]; */

    $html2pdf = new Html2Pdf();
    $html2pdf->writeHTML('<h1>HelloWorld</h1>This is my first test '. $nombre );
    $html2pdf->output();
}

