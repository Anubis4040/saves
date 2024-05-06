<?php namespace Controlador\Historial\historiaInspeccionPlanificadas;

    require_once('../../../autoload.php');

    use Modelo\Inspeccion\Inspeccion;   
        
    $inspeccion = new Inspeccion();

    $info = $inspeccion->HistoriaInspeccionPlanificadas();        

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
     
    
?>