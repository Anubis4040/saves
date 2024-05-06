<?php namespace Controlador\Historial\HistoriaObrasPlanificadas;

    require_once('../../../autoload.php');

    use Modelo\Reparacion\Reparacion;   
        
    $Reparacion = new Reparacion();

    $info = $Reparacion->HistoriaObrasPlanificadas();        

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
     
    
?>