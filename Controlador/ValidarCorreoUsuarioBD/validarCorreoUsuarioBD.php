<?php namespace Controlador\ValidarCorreoUsuarioBD;
    require_once('../../autoload.php');
    
    use Modelo\Usuario\Usuario;  

    //echo __FILE__;

    $a = $_POST['CORREO'];    

    if($a != NULL){       
        $usuario = new Usuario();
        $usuario->SetEmail($a);
        $info = $usuario->ValidarCorreoUsuarioaBD();        
    }
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>