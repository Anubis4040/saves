<?php namespace Controlador\PlanificarPetInsp;

    require_once('../../autoload.php');
    use Modelo\Peticion\Peticion;  

    //echo __FILE__; 
   
    $a = $_POST['COD'];    
   

    if($a != NULL ){
     
        $Peticion = new Peticion();
        $Peticion->SetCodigo($a);     
        $info = $Peticion->CoordenadasPet();                  
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info); 
      
        
    }

?>