<?php namespace Controlador\InformacionUsuariosRegistrados\InformacionUsuario;

    require_once('../../../autoload.php');
    use Modelo\Usuario\Usuario;          

    //echo __FILE__;

    $a = $_POST['LOGIN']; 
    $b = $_POST['TIPO'];   

    if($a != NULL && $b != NULL){
        $usuario = new Usuario();  
        $usuario->SetLogin($a);  
        if($b == 1){
            $info = $usuario->InformacionUsuario($b);  
        }else if($b == 2){
            $info = $usuario->InformacionUsuario($b);  
        }  

        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);
              
    }
    
   
    
?>