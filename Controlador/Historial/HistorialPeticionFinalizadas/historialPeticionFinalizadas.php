<?php namespace Controlador\Historial\HistorialPeticionFinalizadas;

    require_once('../../../autoload.php');

    use Modelo\Peticion\Peticion;     

    
    $peticion = new Peticion();

    $info = $peticion->HistorialPeticionFinalizadas();        

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
     
    
?>