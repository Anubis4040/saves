<?php namespace Controlador\InformesPdf;

    require_once('../../autoload.php');

    require "../../vendor/autoload.php";

    use Spipu\Html2Pdf\Html2Pdf;

    use Modelo\Inspeccion\Inspeccion;

    if( isset($_GET['cod']) ){

        $cod = $_GET['cod'];
    
        $Inspeccion = new Inspeccion;

        $result = $Inspeccion->reportePdfA($cod);
        
        //(print_r($result);

       $pritPDF = new Html2Pdf;
       $pritPDF->writeHTML("");
       $pritPDF->output();
    }

    