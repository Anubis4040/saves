<?php namespace Controlador\Historial\HistorialSolicitantePP;

    require_once('../../../autoload.php');

    use Modelo\Solicitante\Solicitante;          

    //echo __FILE__;

    $a = $_POST['TIPO'];

    if($a != NULL){
        $solicitante = new Solicitante();
    
        $solicitante->SetTipoOrg($a);

        $info = $solicitante->HistorialSolicitantePP();        
    
        
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);
    }    
    
?>