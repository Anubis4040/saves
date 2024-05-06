<?php namespace Controlador\ValidarCivaBD;
    require_once('../../autoload.php');
    
    use Modelo\Ingeniero\Ingeniero;  

    //echo __FILE__;

    $a = $_POST['CIV'];    

    if($a != NULL){       
        $usuario = new Ingeniero();
        $usuario->SetIngenieroCiv($a);
        $info = $usuario->ValidarCivBD();        
    }
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>