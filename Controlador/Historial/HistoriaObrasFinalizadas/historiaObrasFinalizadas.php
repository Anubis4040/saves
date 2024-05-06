<?php namespace Controlador\Historial\HistoriaObrasFinalizadas;

    require_once('../../../autoload.php');

    use Modelo\Reparacion\Reparacion;   
        
    $Reparacion = new Reparacion();

    $info = $Reparacion->HistoriaObrasFinalizadas();        

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
     
    
?>