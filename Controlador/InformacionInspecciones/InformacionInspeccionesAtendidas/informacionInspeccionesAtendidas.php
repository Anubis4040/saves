<?php namespace Controlador\InformacionInspeccionesAtendidas\informacionInspeccionesAtendidas;

    require_once('../../../autoload.php');
    use Modelo\Peticion\Peticion;  
    use Modelo\Inspeccion\Inspeccion;       

    $a = $_POST['COD']; 
    $b = $_POST['EST']; 

    if($a != NULL && $b != NULL){  
        $Peticion = new Peticion();  
        $Peticion->SetCodigo($a);
        $info = $Peticion->InformacionPeticionesAtendidas($b); 
        $inspeccion = new Inspeccion();
        $img = $inspeccion->imagenesInspeccion($info[0]['idInspeccion']);
        $info[] = $img;
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);     
    }       
    
?>

