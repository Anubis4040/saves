<?php namespace Controlador\InformacionPeticionesAtendidas\informacionPeticionesAtendidas;

    require_once('../../../autoload.php');
    use Modelo\Peticion\Peticion;      

    $a = $_POST['COD']; 
    $b = $_POST['EST']; 

    if($a != NULL && $b != NULL){  
        $Peticion = new Peticion();  
        $Peticion->SetCodigo($a);
        $info = $Peticion->InformacionPeticionesAtendidas($b);   
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);     
    }       
    
?>

