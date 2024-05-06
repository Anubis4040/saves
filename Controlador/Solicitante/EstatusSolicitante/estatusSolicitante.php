<?php namespace Controlador\Solicitante\EstatusSolicitante;

    require_once('../../../autoload.php');
    use Modelo\Solicitante\Solicitante;          

    //echo __FILE__;

    $a = $_POST['CODIGO']; 
    $b = $_POST['ESTATUS'];    
    $c = $_POST['TIPO'];  

    if($a != NULL && $a != NULL && $c != NULL){  
        $Solicitante = new Solicitante();
        if($c == 'true'){
            $Solicitante->SetRif($a);    
        }else if($c == 'false'){
            $Solicitante->SetCi($a);    
        }         
        $Solicitante->SetEstatus($b);   
        $info = $Solicitante->EstatusSolicitante($c);        
    }
    
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);
    
?>