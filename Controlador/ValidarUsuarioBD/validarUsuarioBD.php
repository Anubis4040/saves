<?php namespace Controlador\ValidarUsuarioBD;

    require_once('../../autoload.php');
        
    use Modelo\Usuario\Usuario;  

    //echo __FILE__;

    $a = $_POST['USUARIO'];    

    if($a != NULL){    
        $usuario = new Usuario();   
        $usuario->SetLogin($a); 
        $info = $usuario->ValidarUsuarioBD();        
    }
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>