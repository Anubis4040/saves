<?php namespace Controlador\Material\ListarMaterial;

    require_once('../../../autoload.php');
    use Modelo\Material\Material;    
    
    $material = new Material();
    $info = $material->ListarMateriales();            
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);  
    
?>