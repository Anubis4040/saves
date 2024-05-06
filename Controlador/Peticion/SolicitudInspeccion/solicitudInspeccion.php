<?php namespace Controlador\Peticion\SolicitudInspeccion;

    require_once('../../../autoload.php');        
    use Modelo\Peticion\Peticion;   

    //echo __FILE__;   
    $a = $_POST['COD'];
    $b = $_POST['SOLI'];    
    $c = $_POST['FECHA'];
    $d = $_POST['INFO'];    
    $e = $_POST['COOR'];
    $f = $_POST['MOTIVO'];    

    $info = \explode(',',$d); 

    $cord = \explode(',',$e); 

    if($a != NULL && $b != NULL && $c != NULL && $d != NULL && $e != NULL && $f != NULL){
        $peticion = new Peticion();
        $peticion->SetCoordenadas($cord[0],$cord[1],$info[0]);
        $peticion->SetPeticion($c,$f);
        $info = $peticion->SolicitudInspeccion($a);     

        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info); 
    }

?>