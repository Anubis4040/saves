<?php namespace Controlador\InformacionSolicitantes\InformacionSolicitantesP;

    require_once('../../../autoload.php');
    use Modelo\Solicitante\Solicitante;          

    //echo __FILE__;

    $a = $_POST['CI'];    
    $b = $_POST['TIPO']; 

    if($a != NULL && $b != NULL){  
        $solicitante = new Solicitante();  
        $solicitante->SetCi($a);
        $info = $solicitante->InformacionSolicitantesP($b);   
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);     
    }       
    
?>

