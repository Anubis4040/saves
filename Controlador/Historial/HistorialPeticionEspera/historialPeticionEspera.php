<?php namespace Controlador\Historial\HistorialPeticionEspera;

    require_once('../../../autoload.php');

    use Modelo\Peticion\Peticion;   
        
    $peticion = new Peticion();

    $info = $peticion->HistorialPeticionEspera();        

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
     
    
?>