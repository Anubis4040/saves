<?php namespace Controlador\IniciarSesion;

    require_once('../../autoload.php');
    use Modelo\Usuario\Usuario;

    //echo __FILE__;

    $a = $_POST['USUARIO'];
    $b = $_POST['CLAVE'];   

    if( $a != NULL && $b != NULL  ){
        $usuario = new Usuario();
        $usuario->SetSesion($a,$b);
        $info = $usuario->IniciarSesion();
    }
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>