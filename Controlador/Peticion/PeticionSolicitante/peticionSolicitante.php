<?php namespace Controlador\Peticion\PeticionSolicitante;

    require_once('../../../autoload.php');        
    use Modelo\Peticion\Peticion;   

    //echo __FILE__;   
    $a = $_POST['COD'];
  
    if($a != NULL ){
        $peticion = new Peticion();      
        $info = $peticion->PeticionSolicitante($a);     
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info); 
    }

?>