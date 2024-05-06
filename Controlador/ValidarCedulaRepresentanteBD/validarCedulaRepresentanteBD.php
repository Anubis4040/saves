<?php namespace Controlador\ValidarCedulaRepresentanteBD;
    require_once('../../autoload.php');
    
    use Modelo\Solicitante\Solicitante;  

    //echo __FILE__;

    $a = $_POST['CEDULA'];    

    if($a != NULL){       
        $usuario = new Solicitante();
        $usuario->SetCi($a);
        $info = $usuario->ValidarCedulaRepresentanteBD(); 
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);       
    }   
    
?>