<?php namespace Controlador\Usuario\EstatusUsuario;

    require_once('../../../autoload.php');
    use Modelo\Usuario\Usuario;          

    //echo __FILE__;

    $a = $_POST['LOGIN']; 
    $b = $_POST['ESTATUS'];    

    if($a != NULL && $a != NULL){  
        $usuario = new Usuario();  
        $usuario->SetLogin($a);
        $usuario->SetEstatus($b);   
        $info = $usuario->EstatusUsuario();        
    }
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>