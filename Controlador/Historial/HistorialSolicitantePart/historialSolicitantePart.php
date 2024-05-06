<?php namespace Controlador\Historial\HistorialSolicitantePart;

    require_once('../../../autoload.php');

    use Modelo\Solicitante\Solicitante;          

    //echo __FILE__;

    $solicitante = new Solicitante();  

    $info = $solicitante->HistorialSolicitantePart();      
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>