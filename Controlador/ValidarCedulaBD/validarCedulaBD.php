<?php namespace Controlador\ValidarCedulaBD;
    require_once('../../autoload.php');
    
    use Modelo\Usuario\Usuario;  

    //echo __FILE__;

    $a = $_POST['CEDULA'];    

    if($a != NULL){       
        $usuario = new Usuario();
        $usuario->SetCi($a);
        $info = $usuario->ValidarCedulaBD(); 
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);       
    }   
    
?>