<?php namespace Controlador\CerrarSesion;

    require_once('../../autoload.php');
    
    use Modelo\Usuario\Usuario;

    $usuario = new Usuario;
    
    $info = $usuario->CerrarSesion();      
         
    echo $info;
    
?>