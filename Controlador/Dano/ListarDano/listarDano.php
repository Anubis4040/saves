<?php namespace Controlador\Dano\ListarDano;

    require_once('../../../autoload.php');
    use Modelo\Dano\Dano;       
    
    $dano = new Dano();
    $info = $dano->ListarDano();            
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);     

?>