<?php namespace Controlador\Historial\HistorialUsuarioIng;

    require_once('../../../autoload.php');

    use Modelo\Usuario\Usuario;          

    //echo __FILE__;

    $usuario = new Usuario();  

    $info = $usuario->HistorialUsuarioIng();        
   
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>