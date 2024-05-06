<?php namespace Controlador\Material\ListarMaterial;

    require_once('../../../autoload.php');
    use Modelo\Maquina\Maquina;     
    
    $maquina = new Maquina();
    $info = $maquina->ListarMaquinas();            
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);     
?>