<?php namespace Controlador\InformacionSolicitantes\InformacionSolicitantesP;

    require_once('../../../autoload.php');
    use Modelo\Solicitante\Solicitante;          

    //echo __FILE__;

    $a = $_POST['RIF'];    
    $b = $_POST['TIPO']; 

    if($a != NULL && $b != NULL){
        $solicitante = new Solicitante();  
        $solicitante->SetRif($a); 
        $info = $solicitante->InformacionSolicitantesPP($b);   
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);     
    }       
    
?>

