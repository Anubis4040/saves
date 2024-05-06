<?php namespace Controlador\Historial\historialSolicitanteInactivo;

    require_once('../../../autoload.php');

    use Modelo\Solicitante\Solicitante;          

    $a = $_POST['TIPO'];

    if($a != NULL){
        $solicitante = new Solicitante();  

        $info = $solicitante->HistorialSolicitanteInact($a);      
        
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);
    }    
    
?>