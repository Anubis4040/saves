<?php namespace Controlador\InformacionPeticiones\InformacionPeticionesEspera;

    require_once('../../../autoload.php');
    use Modelo\Peticion\Peticion;      

    $a = $_POST['COD']; 

    if($a != NULL){  
        $Peticion = new Peticion();  
        $Peticion->SetCodigo($a);
        $info = $Peticion->InformacionPeticionesEspera($a);   
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);     
    }       
    
?>

