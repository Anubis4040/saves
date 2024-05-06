<?php namespace Controlador\ValidarCorreoSolicitanteBD;
    require_once('../../autoload.php');
    
    use Modelo\Solicitante\Solicitante;  

    //echo __FILE__;

    $a = $_POST['CORREO'];    

    if($a != NULL){       
        $solicitante = new Solicitante();
        $solicitante->SetCorreo($a);
        $info = $solicitante->ValidarCorreoSolicitanteBD();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);        
    }
    
    
    
?>