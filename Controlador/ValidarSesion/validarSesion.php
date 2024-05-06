<?php namespace Controlador\ValidarSesion;    

    require_once('../../autoload.php');
        
    use Modelo\Usuario\Usuario;

    $usuario = new Usuario;
    
    $info = $usuario->ValidarSesion();  
         
    if(gettype($info) == "array"){
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);        
    }else{
        echo $info;
    }    
    
?>